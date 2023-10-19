import cn from 'classnames';
import InputMask from 'react-input-mask';
import { type TReactInput } from '../index';
import { type ChangeEvent } from 'react';
import '../react-input.scss';

export const ReactPhoneInput: TReactInput = ({
  className,
  callbackOnChange,
  ...props
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const result = event.target.value.replace(/\D/g, '');

    if (typeof callbackOnChange === 'function') {
      callbackOnChange(event, result);
    }
  };

  return (
    <InputMask
      type={'tel'}
      mask="+7 (999) 999-99-99"
      className={cn('react-input t4', className)}
      onChange={handleChange}
      {...props}
    />
  );
};
