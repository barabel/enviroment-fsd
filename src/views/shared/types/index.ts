import { type FC, type PropsWithChildren } from 'react';

export type FCClassRaw<T = object> = PropsWithChildren<T & { className?: string }>;
export type FCClass<T = object> = FC<FCClassRaw<T>>;
export type TPopupChild<K = object> = FCClass<{
  closePopup: () => void
} & K>;
