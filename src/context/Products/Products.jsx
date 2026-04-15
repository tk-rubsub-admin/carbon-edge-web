/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useState } from 'react';
// import mockProducts from '../../data/mockProducts';

export const productsContext = createContext(null);

export default function ProductsContextProvider({ children }) {
  const productsApiUrl = 'http://localhost:8080/api/v1/products?page=0&size=20';
  const searchProductsApiUrl = 'http://localhost:8080/api/v1/products';

  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-300' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return stars;
  }

  const [searchRes, setSearchRes] = useState(null);

  function normalizeProduct(product) {
    return {
      ...product,
      id: String(product?.id ?? product?.productId ?? ''),
      nameTh: product?.nameTh ?? product?.name ?? '',
      nameEn: product?.nameEn ?? product?.name ?? '',
      province: product?.province ?? '',
      amphure: product?.amphure ?? product?.district ?? '',
      price: Number(product?.price ?? 0),
      category: product?.categoryName ?? product?.category ?? '',
      imageCover: product?.imageUrl ?? product?.imageCover ?? '',
      ratingsAverage: Number(product?.ratingsAverage ?? product?.rating ?? 0),
      contact: product?.contact ?? '',
      description: product?.description ?? '',
    };
  }

  async function getProducts() {
    const response = await axios.get(productsApiUrl);
    const payload = response.data ?? {};
    const products =
      payload?.data?.content ??
      payload?.data?.items ??
      payload?.data ??
      payload?.content ??
      payload?.items ??
      [];

    return Array.isArray(products) ? products.map(normalizeProduct) : [];
  }

  async function searchProducts(keyword) {
    const response = await axios.get(searchProductsApiUrl, {
      params: {
        keyword,
      },
    });

    const payload = response.data ?? {};
    const products =
      payload?.data?.content ??
      payload?.data?.items ??
      payload?.data ??
      payload?.content ??
      payload?.items ??
      [];

    return Array.isArray(products) ? products.map(normalizeProduct) : [];
  }

  async function searchProductsByCategory(categoryId) {
    const response = await axios.get(searchProductsApiUrl, {
      params: {
        categoryId,
      },
    });

    const payload = response.data ?? {};
    const products =
      payload?.data?.content ??
      payload?.data?.items ??
      payload?.data ??
      payload?.content ??
      payload?.items ??
      [];

    return Array.isArray(products) ? products.map(normalizeProduct) : [];
  }

  // const { data } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: () => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(mockProducts);
  //       }, 300);
  //     });
  //   },
  // });

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <productsContext.Provider
      value={{
        data,
        searchRes,
        setSearchRes,
        renderStars,
        searchProducts,
        searchProductsByCategory,
      }}
    >
      {children}
    </productsContext.Provider>
  );
}
