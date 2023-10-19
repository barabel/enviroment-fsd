import cn from 'classnames';
import { type FCClass } from '@/shared/types';
import './react-preview.scss';
import { type TReactPreview } from '../../types';
import { useEffect, useState } from 'react';
import { ReactButtonPlay } from '@/shared/react/button';

export const ReactPreview: FCClass<TReactPreview> = ({
  className,
  preview,
  showPlayButton = true,
  onClick,
  children,
}) => {
  const [showButton, setShowButton] = useState(showPlayButton);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    setShowButton(showPlayButton);
  }, [showPlayButton]);

  const handleClick = (): void => {
    setShowPreview(false);

    if (typeof onClick === 'function') {
      onClick();
    }
  }

  return (
    <div className={cn('react-preview', className)}>
      {showButton &&
        <ReactButtonPlay
          className='react-preview__button'
          onClick={handleClick}
        />
      }
      {preview && showPreview && <img className='react-preview__preview' src={preview} alt='preview' />}
      <div className='react-preview__player'>
        {children}
      </div>
    </div>
  )
}
