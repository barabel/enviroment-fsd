import { type FCClass } from '@/shared/types';
import { type ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './react-button-play.scss';
import { Icon } from '@/shared/react/icon';
import { IconsArray } from '@/shared/enums';

export const ReactButtonPlay: FCClass<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cn('react-button-play', className)}
      type='button'
      {...props}
    >
      <Icon
        className='react-button-play__icon'
        icon={IconsArray.play}
      />
    </button>
  );
}
