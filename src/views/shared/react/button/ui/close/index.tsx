import { type FCClass } from '@/shared/types';
import { type ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './react-button-close.scss';

export const ReactButtonClose: FCClass<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cn('react-button-close', className)}
      type='button'
      {...props}
    />
  );
}
