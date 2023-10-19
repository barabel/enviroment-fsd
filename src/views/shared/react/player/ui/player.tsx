import { type FCClass } from '@/shared/types';
import { VideoTypes, getVideoTypeByURL } from '../lib/getVideoTypeByURL';
import { lazy } from 'react';
import { type TReactPlayer } from '../types';

const videoComponents = {
  [VideoTypes.youtube]: lazy(async() => await import('./youtube')),
  [VideoTypes.rutube]: lazy(async() => await import('./rutube')),
  [VideoTypes.video]: lazy(async() => await import('./video')),
}

export const ReactPlayer: FCClass<TReactPlayer> = ({
  className,
  url,
  preview,
}) => {
  const videoType = getVideoTypeByURL(url);
  const LazyPlayer = videoComponents[videoType];

  return (
    <LazyPlayer
      className={className}
      url={url}
      preview={preview}
    />
  )
}
