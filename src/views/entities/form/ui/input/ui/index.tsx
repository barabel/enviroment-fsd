import { type FCClass } from '@/shared/types';
import { type InputHTMLAttributes } from 'react';
import cn from 'classnames';
import './react-input.scss';

export type TReactInput = FCClass<InputHTMLAttributes<HTMLInputElement> & { callbackOnChange?: Function }>;

export const ReactInput: TReactInput = ({
  className,
  ...props
}) => {
  return (
    <input
      className={cn('react-input t4', className)}
      {...props}
    />
  );
}
