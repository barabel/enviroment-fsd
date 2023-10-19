import cn from 'classnames';
import Tippy from '@tippyjs/react';
import { type FCClass } from '@/shared/types';
import './wrapper-field.scss'
import { Icon } from '@/shared/react/icon';
import { IconsArray } from '@/shared/enums';

export interface IWrapperFiledProps {
  error?: string
}

export const WrapperField: FCClass<IWrapperFiledProps> = ({
  className,
  error,
  children,
}) => {
  return (
    <div className={cn('wrapper-field', className)}>
      <label className='wrapper-field__label'>
        {children}
      </label>
      {Boolean(error) &&
        <Tippy
          theme='light'
          placement='bottom'
          appendTo={(element) => element.parentElement as HTMLElement}
          content={
            <div className='wrapper-field__tippy t3'>
              {error}
            </div>
          }
          animation={'scale'}
        >
          <Icon className='wrapper-field__error-icon' icon={IconsArray.formErrorIcon} />
        </Tippy>
      }
    </div>
  );
};
