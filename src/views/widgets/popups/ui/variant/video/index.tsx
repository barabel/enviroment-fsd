import { type TPopupChild } from '@/shared/types';
import cn from 'classnames';
import './popup-video.scss';
import { ReactButtonClose } from '@/shared/react/button';
import { ReactPlayer, type TReactPlayer } from '@/shared/react/player';

const PopupVideo: TPopupChild<TReactPlayer> = ({
  className,
  closePopup,
  url,
  preview,
}) => {
  return (
    <div className={cn('popup-video', className)}>
      <ReactButtonClose className='popup-video__button-close react-button-close--white' onClick={closePopup} />
      <ReactPlayer
        className='popup-video__player'
        url={url}
        preview={preview}
      />
    </div>
  );
}

export default PopupVideo;
