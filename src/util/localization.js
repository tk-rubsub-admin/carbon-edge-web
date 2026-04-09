export const getLocalizedProductName = (product, language) =>
  language === 'en' && product?.nameEn ? product.nameEn : product?.nameTh;

export const getLocalizedProductDescription = (product, language) => {
  if (language === 'en' && product?.descriptionEn) {
    return product.descriptionEn;
  }

  return product?.description || '';
};
