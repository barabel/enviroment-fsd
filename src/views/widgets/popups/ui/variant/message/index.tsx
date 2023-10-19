import { type TPopupChild } from '@/shared/types';
import { ReactButtonClose } from '@/shared/react/button';
import cn from 'classnames';
import './popup-message.scss';

export interface TPopupMessage {
  title?: string
  description?: string
}

const PopupMessage: TPopupChild<TPopupMessage> = ({
  className,
  title = 'Спасибо',
  description = 'Менеджер перезвонит вам в ближайшее время',
  closePopup,
}) => {
  return (
    <div className={cn('popup-message', className)}>
      <ReactButtonClose className='popup-message__button-close' onClick={closePopup} />
      <div className='popup-message__title h3'>
        {title}
      </div>
      <div className='popup-message__description t1'>
        {description}
      </div>
    </div>
  );
}

export default PopupMessage;
