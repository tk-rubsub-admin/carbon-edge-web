import { useContext, useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Spinner from '../Spinner/Spinner';
import { wishlistContext } from '../../context/Wishlist/Wishlist';
import { productsContext } from '../../context/Products/Products';
import { authContext } from '../../context/Auth/Auth';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const { t } = useTranslation();
  const { data } = useContext(productsContext);
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
    <section className="container mb-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
            {t('products.title')}
          </p>
        </div>
      </div>
    </section>
      <div className="container flex flex-wrap items-center">
        {data ? (
          data.map((product) => (
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
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
