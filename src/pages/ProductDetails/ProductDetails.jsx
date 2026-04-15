import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/Cart/Cart.jsx';
import { productsContext } from '../../context/Products/Products.jsx';
import { wishlistContext } from '../../context/Wishlist/Wishlist.jsx';
import { formatCurrency } from '../../util/utils';
import mockProducts from '../../data/mockProducts';
import { useTranslation } from 'react-i18next';
import {
  getLocalizedProductDescription,
  getLocalizedProductName,
} from '../../util/localization';

export default function ProductDetails() {
  const { t, i18n } = useTranslation();
  const { addProduct } = useContext(cartContext);
  const { renderStars } = useContext(productsContext);
  const [ProdDetails, setProdDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  const { id } = useParams();

  const { addToWishlist } = useContext(wishlistContext);

  // useEffect(() => {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //     .then((response) => {
  //       setProdDetails(response.data.data);
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // }, []);

  useEffect(() => {
    const product = mockProducts.find((p) => p.id === id);
    setProdDetails(product);
  }, [id]);

  // 🛑 กัน crash
  if (!ProdDetails) return <div className="p-10">{t('productDetail.loading')}</div>;

  const imgSrc = `/app/product/${ProdDetails.id}.png`;
  const productName = getLocalizedProductName(ProdDetails, i18n.language);
  const productDescription = getLocalizedProductDescription(
    ProdDetails,
    i18n.language
  );
  const detailItems = [
    {
      label: t('productDetail.province'),
      value: ProdDetails.province || '-',
    },
    {
      label: t('productDetail.amphure'),
      value: ProdDetails.amphure || '-',
    },
    {
      label: t('productDetail.contact'),
      value: ProdDetails.contact || '-',
    },
  ];

  return (
    <>
      <br/><br/>
      <Helmet>
        <title>{productName || t('productDetail.unavailable')}</title>
      </Helmet>

      <div className="container pb-12">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-50 via-white to-lime-50 shadow-[0_24px_80px_rgba(22,101,52,0.10)] ring-1 ring-green-100">
          <div className="grid gap-8 px-5 py-6 md:px-8 md:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-green-100">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-green-100/70 to-transparent"></div>
                <div className="relative flex h-[420px] items-center justify-center p-6 md:h-[520px]">
                  <img
                    className="h-full w-full cursor-pointer object-contain"
                    src={imgSrc}
                    alt={productName}
                    loading="lazy"
                    onClick={() => setOpen(true)}
                    onError={(e) => {
                      e.currentTarget.src = "/app/no-image.jpg";
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  {t('productDetail.addToCart')}
                </button>
                <button
                  className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  {t('productDetail.addToWishlist')}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-green-100">
                <div>
                  <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                    {productName}
                  </h2>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
                    <span className="flex">
                      {renderStars(Math.round(ProdDetails.ratingsAverage)).map(
                        (star, index) => (
                          <span key={index}>{star}</span>
                        )
                      )}
                    </span>
                    <span className="text-sm font-semibold text-amber-700">
                      {ProdDetails.ratingsAverage} / 5
                    </span>
                  </div>
                  <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 ring-1 ring-gray-100">
                    {ProdDetails.category || '-'}
                  </div>
                  <div className="ml-auto rounded-2xl bg-green-50 px-4 py-3 text-right ring-1 ring-green-100">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
                      {t('productDetail.price')}
                    </div>
                    <div className="mt-1 text-lg font-bold text-gray-900">
                      {formatCurrency(ProdDetails.price)} {t('products.baht')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-green-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('productDetail.description')}
                </h3>
                <p className="mt-4 text-base leading-8 text-gray-600">
                  {productDescription || '-'}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-green-100">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {t('productDetail.gi')}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-gray-800">-</div>
                </div>

                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-green-100">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {t('productDetail.cfp')}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-gray-800">-</div>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-green-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('productDetail.contact')}
                </h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {detailItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-gray-50 px-4 py-4 ring-1 ring-gray-100"
                    >
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {item.label}
                      </div>
                      <div className="mt-2 text-base font-semibold text-gray-900">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)} // คลิกพื้นหลังปิด
        >
          <div className="max-w-4xl w-full px-4">
            <img
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
              src={imgSrc}
              alt={productName}
              onClick={(e) => e.stopPropagation()} // กันปิดเมื่อคลิกรูป
              onError={(e) => {
                e.currentTarget.src = "/app/no-image.jpg";
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
