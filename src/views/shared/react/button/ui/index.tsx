import { type FCClass } from '@/shared/types';
import { isExternalUrl } from '@/shared/lib/url';
import cn from 'classnames';
import './react-button.scss';

export interface TReactButton {
  title: string
  url?: string
  disabled?: boolean
  onClick?: () => void
}

export const ReactButton: FCClass<TReactButton> = ({
  className,
  title,
  url,
  disabled,
  onClick,
  ...props
}) => {
  const Tag = url !== undefined ? 'a' : 'button';
  const isExternal = typeof url !== 'undefined' ? isExternalUrl(url) : false;

  return (
    <Tag
      className={cn('react-button t4', className, { 'react-button--disabled': disabled })}
      href={url}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      disabled={disabled}
      {...props}
    >
      {title && (
        <span className="react-button__wrapper">
          <span className="react-button__content">
            {title}
          </span>
          <span className="react-button__content">
            {title}
          </span>
        </span>
      )}
    </Tag>
  );
}
