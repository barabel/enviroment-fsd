/**
 * Получение utm меток с ссылки текущей страницы и адрес текущей страницы. Возвращает объект с метками и свойством page, в котором записан адрес текущей страницы.
 */
export const getUTMFromUrlWithCurrentPage = (): Record<string, string> => {
  const url = window.location.search.substring(1);

  const utm: Record<string, string | null> = {};

  const params = new URLSearchParams(url);

  for (const key of params.keys()) {
    if (key.startsWith('utm_') || key.startsWith('ip')) {
      utm[key] = params.get(key);
    }
  }

  const result = {
    ...utm,
    page: window.location.href,
  };

  return result;
};
