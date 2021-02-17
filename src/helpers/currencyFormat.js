export default function numberFormat(value, decimalPoint = 2) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat().format(value.toFixed(decimalPoint));
  }

  return '';
}
