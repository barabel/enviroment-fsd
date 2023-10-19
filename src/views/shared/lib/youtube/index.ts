/**
 * Функция parseYtId парсит приходящую строку(ссылку и возвращает id ссылки)
 */
export const parseYtId = (url: string): string => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[7].length === 11) ? match[7] : '';
}

/**
 * Функция loadYTApi загружает скрипты youtube, если они не были загружены при вызове
 */
export const loadYTApi = async(): Promise<any> => {
  return await new Promise((resolve) => {
    if (window.YT) {
      resolve(window.YT);
    } else {
      const youtubeUrl = 'https://www.youtube.com/iframe_api';

      const scriptArray = Array.from(document.querySelectorAll<HTMLScriptElement>('script'));
      const ytScript = scriptArray.find((script) => script.src === youtubeUrl) ?? document.createElement('script');

      if (ytScript.src) {
        const idInterval = setInterval(() => {
          if (window.YT?.PlayerState) {
            resolve(window.YT);
            clearInterval(idInterval);
          };
        }, 300);

        setTimeout(() => {
          clearInterval(idInterval);
        }, 60000);
      } else {
        ytScript.src = youtubeUrl;

        const firstScriptTag = document.getElementsByTagName('script')[0];

        if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(ytScript, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
          resolve(window.YT);
        };
      }
    }
  });
};
