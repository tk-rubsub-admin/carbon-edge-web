import { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/Cart/Cart';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function Cart() {
  const { t } = useTranslation();
  const { getProducts, deleteProduct, updateProductQuantity } =
    useContext(cartContext);

  const [data, setData] = useState(null);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    main();
  };

  const handleUpdateProductQuantity = async (id, quantity) => {
    await updateProductQuantity(id, quantity);
    main();
  };

  async function main() {
    const data = await getProducts();
    setData(data);
  }

  useEffect(() => {
    async function loadCart() {
      try {
        const nextData = await getProducts();
        setData(nextData);
      } catch {
        setData({
          products: [],
          totalCartPrice: 0,
          id: null,
        });
      }
    }

    loadCart();
  }, []);

  return (
    <div className="container flex flex-wrap">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                {t('cart.product')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('cart.qty')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('cart.price')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('cart.action')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.products.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-xl h-20 font-bold md:text-2xl lg:text-3xl"
                  >
                    <i className="fas fa-box-open me-3"></i>
                    {t('cart.empty')}
                  </td>
                </tr>
              ) : (
                <>
                  {data.products.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Link to={`/product/${product.product._id}`}>
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                            alt={product.product.title}
                            onError={(e) => {
                              e.currentTarget.src = '/app/no-image.jpg';
                            }}
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <Link
                          to={`/product/${product.product._id}`}
                          className="hover:underline"
                        >
                          {product.product.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              handleUpdateProductQuantity(
                                product.id,
                                product.count - 1
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              id="first_product"
                              disabled
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={product.count}
                              required
                            />
                          </div>
                          <button
                            onClick={() => {
                              handleUpdateProductQuantity(
                                product.id,
                                product.count + 1
                              );
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        EGP {product.lineTotal}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          {t('cart.remove')}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.products.length > 0 && (
                    <tr>
                      <td colSpan={5} className="bg-transparent p-0 pt-5">
                        <div className="w-full h-fit rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                          <div className="px-5 pb-5">
                            <div className="my-5 flex items-center justify-between">
                              <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Total Price
                              </h5>
                              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                EGP {data?.totalCartPrice || 0}
                              </span>
                            </div>
                            <Link
                              to={`/checkout/${data?.id}`}
                              className="block w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-800 dark:bg-green-600 dark:focus:ring-green-800 dark:hover:bg-green-700"
                            >
                              Place Order
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            ) : (
              <tr>
                <td colSpan="5" className="py-4">
                  <div>
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
