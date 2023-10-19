import { type MouseEventHandler, Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { type TPopupChild, type FCClass } from '@/shared/types';
import cn from 'classnames';

export interface TPopupsContainer {
  LazyPopup: TPopupChild
  index: number
  closePopup: () => void
  closeAllPopups: () => void
  isCloseAll?: boolean
}

export const PopupsContainer: FCClass<TPopupsContainer> = ({
  LazyPopup,
  index,
  closePopup,
  closeAllPopups,
  isCloseAll = false,
  ...props
}) => {
  const popups = useRef(null);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const [isAppearing, setAppearing] = useState(false);
  const durationClose = 300;

  useEffect(() => {
    const handleCloseEvent = (event: CustomEvent): void => {
      if (event.detail.index === index) {
        closeCurrentPopup();
      }
    }

    window.addEventListener('closePopup', handleCloseEvent);

    setTimeout(() => {
      setAppearing(true);
    }, 10);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('closePopup', handleCloseEvent);
    }
  }, []);

  const closeCurrentPopup = (): void => {
    setAppearing(false);

    timerRef.current = setTimeout(() => {
      isCloseAll ? closeAllPopups() : closePopup();
    }, durationClose);
  }

  const closeByOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === popups.current) {
      closeCurrentPopup();
    }
  }

  return (
    <div ref={popups} className={cn('popups', { 'popups--appearing': isAppearing })} onClick={closeByOverlayClick}>
      <div className='popups__wrapper'>
        <Suspense fallback={<></>}>
          <LazyPopup
            closePopup={closeCurrentPopup}
            {...props}
          />
        </Suspense>
      </div>
    </div>
  );
}
