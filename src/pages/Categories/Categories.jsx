import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const { t } = useTranslation();
  const categoryApiUrl = 'http://localhost:8080/api/v1/categories';
  const publicBasePath = '/app/product';
  // Queries
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  async function getCategories() {
    return axios
      .get(categoryApiUrl)
      .then((response) =>
        (response.data?.data || []).map((category) => ({
          ...category,
          image: category.imageUrl
            ? `${publicBasePath}${category.imageUrl.startsWith('/') ? category.imageUrl : `/${category.imageUrl}`}`
            : '/app/no-image.jpg',
        }))
      )
      .catch((error) => {
        throw error;
      });
  }

  return (
    <>
      <br/> <br/>
      <div className="container flex flex-wrap items-center">
        <h3 className="text-3xl font-medium mb-5 w-full">{t('categories.title')}</h3>
        {data ? (
          data.map((category) => (
            <div
              className="w-full lg:md:w-1/4 md:w-1/3 sm:w-1/2 p-3"
              key={category.id}
            >
              <div className="relative bg-white mx-auto hover:shadow-green-300 transition-shadow shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="rounded-t-lg sm:object-cover object-contain object-top w-full h-80"
                  src={category.image}
                  alt={category.name}
                />
                <div className="px-5 py-2">
                  <h3 className="text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-xl tracking-tight dark:text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
