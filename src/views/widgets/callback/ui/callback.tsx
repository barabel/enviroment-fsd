import { createRoot } from 'react-dom/client';
import { FormCallback } from '@/entities/form';
import { scrollToSmoothly } from '@/shared/lib/scroll';
import { getHeaderSize } from '@/shared/helpers/get-header-size';

interface TScrollToRootOptions {
  offset?: number
  duration?: number
}

export const blockCallback = (parent: HTMLElement): void => {
  if (!parent) return;

  const root = parent.querySelector<HTMLElement>('.callback__form-root');
  if (root) {
    const scrollToRoot = (incOptions?: TScrollToRootOptions): void => {
      const options = {
        ...incOptions,
      }

      options.offset = (getHeaderSize() * -2) + (incOptions?.offset ?? 0);

      scrollToSmoothly(root, {
        ...options,
      });
    }

    const formTitle = root.getAttribute('data-title');

    const renderRoot = createRoot(root);
    renderRoot.render(<FormCallback
      additionalData={{
        formTitle,
      }}
    />);

    const param = window.location.hash.split('#').pop();
    if (param === 'callback') {
      window.addEventListener('load', () => {
        const isMainPage = document.body.classList.contains('body--main-page');
        if (isMainPage) {
          window.addEventListener('preloaderEnd', () => {
            scrollToRoot({
              duration: 2500,
            });
          });
        } else {
          scrollToRoot();
        }
      })
    }
  }
}
