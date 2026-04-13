/**
 * Format a MAD price: 38500 → "38 500 MAD"
 * Uses French spacing (space as thousands separator)
 */
export function formatPrice(price) {
  if (price == null || isNaN(price)) return '— MAD'
  return Number(price).toLocaleString('fr-FR') + ' MAD'
}
