/**
 * Функция для проверки внешней ссылки
 */
export const isExternalUrl = (url: string): boolean => new URL(url, location.origin).origin !== location.origin;
