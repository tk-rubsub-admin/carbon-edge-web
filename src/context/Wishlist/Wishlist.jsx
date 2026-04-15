/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';
import { API_BASE_URL } from '../../config/runtime';

export const wishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const { userToken } = useContext(authContext);

  const wishlistBaseUrl = `${API_BASE_URL}/wishlists`;

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

  function getStoredWishlistId() {
    return (
      localStorage.getItem('wishlistId') ||
      localStorage.getItem('customerId') ||
      localStorage.getItem('userId')
    );
  }

  function normalizeWishlistProducts(payload) {
    if (Array.isArray(payload)) {
      return payload;
    }

    if (Array.isArray(payload?.data)) {
      return payload.data;
    }

    if (Array.isArray(payload?.items)) {
      return payload.items;
    }

    if (Array.isArray(payload?.products)) {
      return payload.products;
    }

    if (Array.isArray(payload?.wishlistItems)) {
      return payload.wishlistItems;
    }

    if (Array.isArray(payload?.data?.items)) {
      return payload.data.items;
    }

    if (Array.isArray(payload?.data?.products)) {
      return payload.data.products;
    }

    if (Array.isArray(payload?.data?.wishlistItems)) {
      return payload.data.wishlistItems;
    }

    return [];
  }

  function normalizeId(value) {
    return value === undefined || value === null ? '' : String(value);
  }

  function getWishlistProductId(item) {
    return normalizeId(
      item?.productId ??
      item?.product?.id ??
      item?.product?.productId ??
      item?.product?.product?.id ??
      item?.product?._id ??
      item?.id ??
      item?._id
    );
  }

  function getWishlistItemId(item) {
    return normalizeId(
      item?.itemId ?? item?.wishlistItemId ?? item?.id ?? item?._id
    );
  }

  function addToWishlist(id) {
    const wishlistId = getStoredWishlistId();

    if (!wishlistId) {
      return Promise.reject(new Error('Missing wishlist id'));
    }

    return toast.promise(
      getWishlist().then((wishlistItems) => {
        const existingItem = wishlistItems.find(
          (item) => getWishlistProductId(item) === normalizeId(id)
        );

        if (existingItem) {
          const wishlistItemId = getWishlistItemId(existingItem);

          if (!wishlistItemId) {
            throw new Error('Missing wishlist item id');
          }

          return deleteWishlistItem(wishlistItemId);
        }

        return axios({
          method: 'post',
          url: `${wishlistBaseUrl}/${wishlistId}/items`,
          headers: getHeaders(),
          data: {
            productId: id,
          },
        }).then((response) => response.data);
      }),
      {
        loading: 'Adding product to wishlist...',
        success: 'Wishlist updated successfully!',
        error: 'Error adding product',
      }
    );
  }

  function deleteWishlistItem(id) {
    const wishlistId = getStoredWishlistId();

    if (!wishlistId) {
      return Promise.reject(new Error('Missing wishlist id'));
    }

    const config = {
      method: 'delete',
      url: `${wishlistBaseUrl}/${wishlistId}/items/${id}`,
      headers: getHeaders(),
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Removing product from wishlist...',
        success: 'Product removed successfully!',
        error: 'Error removing product',
      }
    );
  }

  function getWishlist() {
    const wishlistId = getStoredWishlistId();

    if (!wishlistId) {
      return Promise.resolve([]);
    }

    let config = {
      method: 'get',
      url: `${wishlistBaseUrl}/${wishlistId}`,
      headers: getHeaders(),
    };

    return axios(config)
      .then((response) => normalizeWishlistProducts(response.data))
      .catch((error) => {
        throw error;
      });
  }

  return (
    <wishlistContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        deleteWishlistItem,
        getWishlistProductId,
        normalizeId,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
