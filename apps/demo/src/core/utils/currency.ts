export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2, // Optional: ensure at least two decimal places
  maximumFractionDigits: 2, // Optional: ensure no more than two decimal places
});
