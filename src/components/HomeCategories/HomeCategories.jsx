import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsContext } from '../../context/Products/Products';

export default function HomeCategories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSearchRes, searchProductsByCategory } = useContext(productsContext);
  const categoryApiUrl = 'http://localhost:8080/api/v1/categories';
  const publicBasePath = '/app/product';

  const { data } = useQuery({
    queryKey: ['home-categories'],
    queryFn: getCategories,
  });

  async function getCategories() {
    return axios
      .get(categoryApiUrl)
      .then((response) =>
        (response.data?.data || []).slice(0, 12).map((category) => ({
          ...category,
          image: category.imageUrl
            ? `${publicBasePath}${category.imageUrl.startsWith('/') ? category.imageUrl : `/${category.imageUrl}`}`
            : '/app/no-image.jpg',
        }))
      );
  }

  async function handleCategoryClick(categoryId) {
    try {
      const products = await searchProductsByCategory(categoryId);
      setSearchRes(products);
    } catch {
      setSearchRes([]);
    }

    navigate(`/search?categoryId=${categoryId}`);
  }

  return (
    <section className="container mb-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
            {t('homeCategories.eyebrow')}
          </p>
        </div>
      </div>

      {data ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
          {data.map((category) => (
            <article
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }
              }}
              className="group overflow-hidden rounded-[1.5rem] border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-100/70"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-green-50 to-lime-100">
                <img
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <div className="px-3 py-4 text-center">
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12">
          <Spinner />
        </div>
      )}
    </section>
  );
}
