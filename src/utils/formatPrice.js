const formatPrice = (price) => {
  let formatedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

  return formatedPrice;
};

export { formatPrice };
