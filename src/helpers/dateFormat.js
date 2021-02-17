export default function dateFormat(value, separator = '.') {
  if (typeof value === 'string') {
    return value.replace(/-/gi, separator);
  }

  return '';
}
