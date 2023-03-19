import React, { useRef, useState, useEffect } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const Player = ({ source }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      setPlayer(
        new Plyr(videoRef.current, {
          controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'fullscreen'],
        })
      );
    }
  }, [videoRef]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (player && videoElement) {
      player.source = {
        type: 'video',
        sources: [
          {
            src: source,
            type: 'video/mp4',
          },
        ],
      };

      player.on('error', (event) => {
        console.warn(`Plyr error: ${event.detail}`);
      });
    }
  }, [player, source]);

  return <video ref={videoRef} />;
};

export default Player;


