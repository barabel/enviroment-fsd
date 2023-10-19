import { type TPopupChild } from '@/shared/types';
import cn from 'classnames';
import './popup-callback.scss';
import { ReactButtonClose } from '@/shared/react/button';
import { FormCallback } from '@/entities/form';

export interface TPopupCallback {
  title?: string
}

const PopupCallback: TPopupChild<TPopupCallback> = ({
  className,
  title = 'оставить заявку',
  closePopup,
}) => {
  return (
    <div className={cn('popup-callback', className)}>
      <ReactButtonClose className='popup-callback__button-close' onClick={closePopup} />
      <div className='popup-callback__title h4'>
        {title}
      </div>
      <FormCallback
        additionalData={{
          formTitle: title,
        }}
      />
    </div>
  );
}

export default PopupCallback;
