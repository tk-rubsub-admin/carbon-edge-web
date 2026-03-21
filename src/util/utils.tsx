export const formatCurrency = (value: number) =>
     value.toLocaleString('th-TH', {
    maximumFractionDigits: 0
  });