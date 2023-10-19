import { type FCClass } from '@/shared/types';
import './Checkbox.scss';
import cn from 'classnames';
import { type ChangeEvent, useEffect, useState } from 'react';

export interface ICheckbox {
  title: string
  name?: string
  value: string
  isDisabled?: boolean
  isSelected?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>, isSelected: boolean) => void
}

export const Checkbox: FCClass<ICheckbox> = (props) => {
  const {
    className,
    name,
    value,
    isDisabled,
    isSelected,
    onChange,
    title,
  } = props;

  const [isChecked, setIsChecked] = useState(isSelected ?? false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(!isChecked);
    onChange(event, !isChecked);
  }

  useEffect(() => {
    setIsChecked(isSelected ?? false);
  }, [isSelected]);

  return (
      <div className={cn('checkbox', className)}>
        <label className="checkbox__label">
          <input
              className="checkbox__input"
              type='checkbox'
              name={name}
              value={value}
              disabled={isDisabled}
              checked={isChecked}
              onChange={(event) => { handleChange(event); }}
          />
          <div className="checkbox__wrapper">
            {title && (
                <span className="t3 checkbox__item">{title}</span>
            )}
          </div>
        </label>
      </div>
  );
};
