import cn from 'classnames';
import { type FCClass } from '@/shared/types';
import { useEffect, useRef, useState } from 'react';
import { loadYTApi, parseYtId } from '@/shared/lib/youtube';
import './player-youtube.scss'
import { type TReactPlayer } from '../../types';
import { ReactPreview } from '../preview';

const PlayerYoutube: FCClass<TReactPlayer> = ({
  className,
  url,
  preview,
}) => {
  const refContainer = useRef(null);
  const refYoutubeInst = useRef<any>(null);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!refContainer.current) return;

    const ytId = parseYtId(url);

    loadYTApi().then((YT) => {
      refYoutubeInst.current = new YT.Player(refContainer.current, {
        width: '100%',
        height: '100%',
        videoId: ytId,
        events: {
          onReady: (): void => {
            setShowButton(true);
          },
        },
      });
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const play = (): void => {
    if (refYoutubeInst.current && typeof refYoutubeInst.current.playVideo === 'function') {
      setShowButton(false);
      refYoutubeInst.current.playVideo();
    }
  }

  return (
    <ReactPreview
      onClick={play}
      preview={preview}
      showPlayButton={showButton}
    >
      <div ref={refContainer} className={cn('player-youtube', className)} />
    </ReactPreview>
  );
}

export default PlayerYoutube;
