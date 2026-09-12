
export function formatPrice(price) {

  return new Intl.NumberFormat(
    "en-SA",
    {
      style: "currency",
      currency: "SAR"
    }
  ).format(price);

}