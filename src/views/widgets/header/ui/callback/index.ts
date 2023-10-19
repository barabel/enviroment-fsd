import { openPopup } from '@/shared/lib/popups';

export const initHeaderCallback = (button: HTMLElement): void => {
  button.addEventListener('click', () => {
    openPopup('callback');
  });
}
