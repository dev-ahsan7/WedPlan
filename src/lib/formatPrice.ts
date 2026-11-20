// Prices are in Bangladeshi taka, for example ৳45,000
export const formatPrice = (price: number) => `৳${price.toLocaleString('en-US')}`;
