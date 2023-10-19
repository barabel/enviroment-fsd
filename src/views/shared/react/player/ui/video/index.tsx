import cn from 'classnames';
import { type FCClass } from '@/shared/types';
import './player-video.scss';
import { type TReactPlayer } from '../../types';
import { ReactPreview } from '../preview';
import { useRef, useState } from 'react';

const PlayerVideo: FCClass<TReactPlayer> = ({
  className,
  url,
  preview,
}) => {
  const [showButton, setShowButton] = useState(true);
  const refVideo = useRef<HTMLVideoElement>(null);

  const play = (): void => {
    if (refVideo.current) {
      setShowButton(false);
      refVideo.current.play().catch((error) => { console.error(error) });
    }
  }

  return (
    <ReactPreview
      onClick={play}
      preview={preview}
      showPlayButton={showButton}
    >
      <video
        ref={refVideo}
        className={cn('player-video', className)}
        controls
        src={url}
        preload="auto"
        onPlay={() => { setShowButton(false); }}
        onPause={() => { setShowButton(true); }}
      />
    </ReactPreview>
  )
}

export default PlayerVideo;
