import { type FCClass } from '@/shared/types';
import cn from 'classnames';
import './react-politics.scss';

export interface TReactPolitics {
  text?: string
  linkText?: string
  linkUrl?: string
}

export const ReactPolitics: FCClass<TReactPolitics> = ({
  className,
  text = 'Нажимая на кнопку, вы соглашаетесь',
  linkText = 'с политикой компании в области персональных данных',
  linkUrl = '/politics.pdf',
}) => {
  return (
    <div className={cn('react-politics', className)}>
      <span className="react-politics__text t2">{text} </span>
      <a
        className='react-politics__link t3'
        href={linkUrl}
        target={'_blank'}
        rel={'noreferrer noopener'}
      >
        {linkText}
      </a>
    </div>
  );
}
