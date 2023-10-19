import cn from 'classnames';
import { type FCClass } from '@/shared/types';
import { useEffect, useRef, useState } from 'react';
import './player-rutube.scss';
import { type TReactPlayer } from '../../types';
import { ReactPreview } from '../preview';

const PlayerRutube: FCClass<TReactPlayer> = ({
  className,
  url,
  preview,
}) => {
  const refIframe = useRef<HTMLIFrameElement>(null);

  const [showButton, setShowButton] = useState(false);

  const play = (): void => {
    if (!refIframe.current) return;

    refIframe.current.contentWindow?.postMessage(JSON.stringify({
      type: 'player:play',
      data: {},
    }), '*');

    setShowButton(false);
  }

  useEffect(() => {
    const rutubeReady = (event: any): void => {
      if (!refIframe.current) return;

      const message = JSON.parse(event.data);
      if (message.type === 'player:ready') {
        setShowButton(true);
      }
    };

    window.addEventListener('message', rutubeReady);

    return () => { window.removeEventListener('message', rutubeReady) }
  }, []);

  return (
    <ReactPreview
      preview={preview}
      onClick={play}
      showPlayButton={showButton}
    >
      <iframe
        ref={refIframe}
        width="100%"
        height="100%"
        src={url}
        allowFullScreen
        frameBorder="0"
        className={cn('player-rutube', className)}
      ></iframe>
    </ReactPreview>
  );
}

export default PlayerRutube;
