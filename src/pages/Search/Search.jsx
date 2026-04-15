import { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../context/Wishlist/Wishlist';
import Spinner from '../../components/Spinner/Spinner';
import ProductItem from '../../components/ProductItem/ProductItem';
import { productsContext } from '../../context/Products/Products';
import { authContext } from '../../context/Auth/Auth';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Search() {
  const { t } = useTranslation();
  const { searchRes } = useContext(productsContext);
  const { userToken } = useContext(authContext);

  const { getWishlist, addToWishlist, getWishlistProductId, normalizeId } =
    useContext(wishlistContext);

  const [wishlistIds, setWishlistIds] = useState(null);

  async function handleWishlist(id) {
    await addToWishlist(id);
    main();
  }

  async function main() {
    const wishlistItems = await getWishlist();
    const ids = wishlistItems
      .map((item) => getWishlistProductId(item))
      .filter(Boolean);
    setWishlistIds(ids);
  }

  useEffect(() => {
    if (!userToken) {
      setWishlistIds([]);
      return;
    }

    main().catch(() => {
      setWishlistIds([]);
    });
  }, [userToken]);

  return (
    <>
      <br/><br/>
      <div className="container flex flex-wrap items-center">
        <h3 className="text-3xl font-medium mb-5 w-full">{t('search.title')}:</h3>
        {searchRes ? (
          searchRes.length > 0 ? (
          searchRes.map((product) => (
            <ProductItem
              product={product}
              isWished={wishlistIds?.includes(normalizeId(product.id)) || false}
              key={product.id}
              handleWishlist={handleWishlist}
              isGuest={!userToken}
            />
          ))
          ) : (
            <div className="w-full">
              <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-br from-white via-green-50 to-lime-50 px-6 py-10 text-center shadow-[0_24px_80px_rgba(22,101,52,0.10)] ring-1 ring-green-100 md:px-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-10 w-10 text-green-700"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                    <path d="M8.5 11h5"></path>
                  </svg>
                </div>

                <h4 className="mt-6 text-2xl font-semibold text-gray-900 md:text-3xl">
                  {t('search.emptyTitle')}
                </h4>
                <p className="mx-auto mt-3 max-w-xl text-base leading-8 text-gray-600">
                  {t('search.emptyDescription')}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    {t('search.backHome')}
                  </Link>
                  
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
