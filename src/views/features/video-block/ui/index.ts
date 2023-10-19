import { openPopup } from '@/shared/lib/popups';

export const initVideoBlock = (parent: HTMLElement): void => {
  const parentClass = 'video-block' as const;
  const classes = {
    parent: parentClass,
    buttonPlay: `${parentClass}__button-play`,
  } as const;

  const url = parent.getAttribute('data-url');
  const preview = parent.getAttribute('data-preview');

  const buttonPlayEl = parent.querySelector<HTMLElement>(`.${classes.buttonPlay}`);
  if (buttonPlayEl) {
    buttonPlayEl.addEventListener('click', () => {
      openPopup('video', {
        url,
        preview,
      });
    });
  }
}
