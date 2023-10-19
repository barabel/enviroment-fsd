import { lazy, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { type FCClass } from '@/shared/types';
import { PopupsContainer } from './popups-container';
import { PopupErrorFallback } from './variant/error-fallback';
import { emitEvent } from '@/shared/helpers/emitEvent';
import { ScrollLock } from '@/shared/lib/scroll';
import './popups.scss';

const bodyScrollLock = new ScrollLock();
export interface PopupComponent {
  variant: string
  data?: object
}

export const Popups: FCClass = () => {
  const [popupList, setPopupList] = useState<PopupComponent[]>([]);

  useEffect(() => {
    const listenerOpen = (event: CustomEvent<PopupComponent>): void => {
      openPopup(event.detail);
    }

    window.addEventListener('modalOpen', listenerOpen);

    return () => {
      window.removeEventListener('modalOpen', listenerOpen);
    }
  }, []);

  useEffect(() => {
    if (popupList.length > 0) {
      bodyScrollLock.lock()
    }

    const listenerClose = (): void => {
      emitEvent('closePopup', {
        index: popupList.length - 1,
      });
    }

    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        listenerClose();
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('modalClose', listenerClose);

    return () => {
      if (popupList.length > 0) {
        bodyScrollLock.enable()
      }

      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('modalClose', listenerClose);
    }
  }, [popupList]);

  const openPopup = (data: PopupComponent): void => {
    setPopupList((popupList) => {
      return [...popupList, {
        ...data,
      }];
    });
  }

  const closePopup = (): void => {
    setPopupList((popupList) => {
      const slicedPopupList = popupList.slice(0, -1);

      return slicedPopupList;
    });
  }

  const closeAllPopups = (): void => {
    setPopupList(() => {
      return [];
    });
  }

  return (
    popupList.map((popup, index) => {
      const LazyPopup = lazy(async() => await import('@/widgets/popups/ui/variant/' + popup.variant + '/index.tsx'));

      return (
        <ErrorBoundary
          key={index}
          fallback={
            <PopupsContainer
              index={index}
              LazyPopup={PopupErrorFallback}
              closePopup={closePopup}
              closeAllPopups={closeAllPopups}
            />
          }
        >
          <PopupsContainer
            index={index}
            LazyPopup={LazyPopup}
            closePopup={closePopup}
            closeAllPopups={closeAllPopups}
            {...popup.data}
          />
        </ErrorBoundary>
      )
    })
  );
}
