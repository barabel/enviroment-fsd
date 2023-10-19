import { type FCClass } from '@/shared/types';
import { useRef, type TextareaHTMLAttributes, useCallback, useEffect, type ChangeEvent } from 'react';
import cn from 'classnames';
import './react-textarea.scss';
import { ScrollCustom } from '@/shared/lib/scroll';

export type TReactTextarea = FCClass<TextareaHTMLAttributes<HTMLTextAreaElement>>;

export const ReactTextarea: TReactTextarea = ({
  className,
  onChange,
  children,
  ...props
}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current !== null) {
      new ScrollCustom(scrollRef.current);
    }
  }, []);

  const setTextareaHeight = useCallback((event: ChangeEvent<HTMLElement>) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  }, []);

  return (
    <div ref={scrollRef} className={cn('react-textarea', className)}>
      <textarea
        className='react-textarea__input t4'
        onChange={event => {
          setTextareaHeight(event);

          if (typeof onChange === 'function') {
            onChange(event);
          }
        }}
        rows={1}
        {...props}
      >
        {children}
      </textarea>
    </div>
  );
}
