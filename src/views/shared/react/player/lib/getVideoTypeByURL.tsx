export enum VideoTypes {
  youtube = 'youtube',
  rutube = 'rutube',
  video = 'video',
}

/**
 * регулярное выражение для валидации сылки на видео с youtub
 */
export const regExpYouTube = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

/**
 * регулярное выражение для валидации сылки на видео с rutube
 */
export const regExpRuTube = /(?:https?:\/\/)?(?:rutu\.be\/|rutube\.ru(\/play\/))/;

/**
 * Функция возвращает тип видео
 */
export const getVideoTypeByURL = (url: string): VideoTypes => {
  if (regExpRuTube.test(url)) {
    return VideoTypes.rutube;
  }

  if (regExpYouTube.test(url)) {
    return VideoTypes.youtube;
  }

  return VideoTypes.video;
}
