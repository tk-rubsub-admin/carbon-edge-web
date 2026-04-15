import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';
import { API_BASE_URL, withBasePath } from '../../config/runtime';

export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  const { userToken } = useContext(authContext);
  const cartApiBaseUrl = `${API_BASE_URL}/carts`;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  function getHeaders() {
    const storedToken = String(localStorage.getItem('authToken') || userToken || '')
      .replace(/^Bearer\s+/i, '')
      .trim();
    const tokenType = String(localStorage.getItem('authTokenType') || 'Bearer')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      token: storedToken,
      Authorization: storedToken ? `${tokenType} ${storedToken}` : undefined,
    };
  }

  function extractCartId(payload) {
    return (
      payload?.cartId ||
      payload?.id ||
      payload?.data?.cartId ||
      payload?.data?.id ||
      payload?.data?.cart?.id ||
      payload?.data?.cart?.cartId
    );
  }

  function normalizeCartItem(item) {
    const productId = String(item?.productId ?? '');
    const quantity = Number(item?.quantity ?? item?.count ?? 0);
    const unitPrice = Number(item?.unitPrice ?? item?.price ?? 0);

    return {
      id: item?.id,
      productId,
      quantity,
      unitPrice,
      lineTotal: Number(item?.lineTotal ?? quantity * unitPrice),
      product: {
        _id: productId,
        id: productId,
        title: item?.productName ?? '',
        imageCover: withBasePath(`/product/${productId}.png`),
        sku: item?.sku ?? '',
      },
      count: quantity,
      price: unitPrice,
    };
  }

  function calculateTotalItems(items, fallbackTotalItems) {
    const totalItems = Number(fallbackTotalItems ?? 0);

    if (totalItems > 0) {
      return totalItems;
    }

    return items.reduce((sum, item) => sum + Number(item?.quantity ?? item?.count ?? 0), 0);
  }

  function normalizeCart(payload) {
    const cart = payload?.data ?? payload ?? {};
    const items = Array.isArray(cart?.items) ? cart.items.map(normalizeCartItem) : [];
    const totalItems = calculateTotalItems(items, cart?.totalItems);
    const itemsTotal = items.reduce((sum, item) => sum + Number(item?.lineTotal ?? 0), 0);
    const subtotal = Number(cart?.subtotal ?? 0) || itemsTotal;
    const totalAmount = Number(cart?.totalAmount ?? 0) || subtotal;

    return {
      _id: cart?.id,
      id: cart?.id,
      customerId: cart?.customerId ?? '',
      status: cart?.status ?? '',
      items,
      products: items,
      subtotal,
      discountAmount: Number(cart?.discountAmount ?? 0),
      totalAmount,
      totalCartPrice: totalAmount,
      totalItems,
      createdAt: cart?.createdAt ?? '',
      updatedAt: cart?.updatedAt ?? '',
    };
  }

  async function ensureCartId() {
    const existingCartId = localStorage.getItem('cartId');

    if (existingCartId) {
      return existingCartId;
    }

    const customerId = localStorage.getItem('customerId') || '';
    const response = await axios.post(
      cartApiBaseUrl,
      { customerId },
      { headers: getHeaders() }
    );
    const nextCartId = extractCartId(response.data);

    if (!nextCartId) {
      throw new Error('Missing cartId from create cart response');
    }

    localStorage.setItem('cartId', String(nextCartId));
    return nextCartId;
  }

  function getProducts() {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      setCartItemsCount(0);
      return Promise.resolve(normalizeCart({ data: { items: [], totalItems: 0 } }));
    }

    const config = {
      method: 'get',
      url: `${cartApiBaseUrl}/${cartId}`,
      headers: getHeaders(),
    };

    return axios(config)
      .then((response) => {
        const normalizedCart = normalizeCart(response.data);
        setCartItemsCount(normalizedCart.totalItems);
        return normalizedCart;
      })
      .catch((error) => {
        throw error;
      });
  }

  function addProduct(id) {
    const productId = String(id ?? '').trim();

    if (!productId) {
      return Promise.reject(new Error('Missing product id'));
    }

    const request = ensureCartId()
      .then((cartId) =>
        axios.post(
          `${cartApiBaseUrl}/${cartId}/items`,
          {
            productId,
            quantity: 1,
          },
          { headers: getHeaders() }
        )
      )
      .then((response) => {
        const normalizedCart = normalizeCart(response.data);
        setCartItemsCount(normalizedCart.totalItems);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return toast.promise(request, {
      loading: 'Adding product...',
      success: 'Product added successfully!',
      error: 'Error adding product',
    });
  }

  function deleteProduct(id) {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      return Promise.reject(new Error('Missing cart id'));
    }

    let config = {
      method: 'delete',
      url: `${cartApiBaseUrl}/${cartId}/items/${id}`,
      headers: getHeaders(),
    };

    return toast.promise(
      axios(config)
        .then((response) => {
          const normalizedCart = normalizeCart(response.data);
          setCartItemsCount(normalizedCart.totalItems);
          return response.data;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Deleting product...',
        success: 'Product deleted successfully!',
        error: 'Error deleting product',
      }
    );
  }

  function updateProductQuantity(id, quantity) {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      return Promise.reject(new Error('Missing cart id'));
    }

    let data = { quantity };

    let config = {
      method: 'put',
      url: `${cartApiBaseUrl}/${cartId}/items/${id}`,
      headers: getHeaders(),
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => {
          const normalizedCart = normalizeCart(response.data);
          setCartItemsCount(normalizedCart.totalItems);
          return response.data;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Updating product quantity...',
        success: 'Product quantity updated successfully!',
        error: 'Error updating product quantity',
      }
    );
  }

  function emptyCart() {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      setCartItemsCount(0);
      return Promise.resolve(null);
    }

    let config = {
      method: 'delete',
      url: `${cartApiBaseUrl}/${cartId}`,
      headers: getHeaders(),
    };

    return axios
      .request(config)
      .then((response) => {
        setCartItemsCount(0);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  useEffect(() => {
    if (!userToken) {
      setCartItemsCount(0);
      return;
    }

    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      setCartItemsCount(0);
      return;
    }

    axios({
      method: 'get',
      url: `${cartApiBaseUrl}/${cartId}`,
      headers: getHeaders(),
    })
      .then((response) => {
        const normalizedCart = normalizeCart(response.data);
        setCartItemsCount(normalizedCart.totalItems);
      })
      .catch(() => {
        setCartItemsCount(0);
      });
  }, [userToken]);

  return (
    <cartContext.Provider
      value={{
        getProducts,
        addProduct,
        deleteProduct,
        updateProductQuantity,
        emptyCart,
        cartItemsCount,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
