export function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function validatePhoneNumber(phone: string) {
  const phoneRegex = /^\+?[78][\s(]?9\d{2}[\s)-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  return phoneRegex.test(phone);
}

export function formatPhoneNumber(phone: string) {
  let cleaned = (`${ phone}`).replace(/\D/g, '');

  if (cleaned.startsWith('8')) {
    cleaned = `+7${ cleaned.slice(1)}`;
  } else if (cleaned.startsWith('7')) {
    cleaned = `+${ cleaned}`;
  }
  return cleaned;
}

