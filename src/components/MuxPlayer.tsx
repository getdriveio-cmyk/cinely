import { useEffect, useRef } from 'react';
import MuxPlayer from '@mux/mux-player-react';

interface MuxPlayerProps {
  playbackId: string;
  playbackToken?: string;
  autoplay?: boolean;
  startTime?: number;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
  className?: string;
  title?: string;
  viewerUserId?: string;
}

const MuxPlayerComponent: React.FC<MuxPlayerProps> = ({
  playbackId,
  playbackToken,
  autoplay = false,
  startTime = 0,
  onTimeUpdate,
  onEnded,
  onError,
  className = '',
  title = 'Cinely Content',
  viewerUserId = 'demo-user'
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    // Set start time if provided
    if (startTime > 0) {
      player.currentTime = startTime;
    }

    // Set autoplay if requested
    if (autoplay) {
      player.play().catch(console.error);
    }

    // Add event listeners
    const handleTimeUpdate = () => {
      onTimeUpdate?.(player.currentTime, player.duration);
    };

    const handleEnded = () => {
      onEnded?.();
    };

    const handleError = (event: Event) => {
      const error = (event.target as HTMLVideoElement)?.error;
      console.error('Mux Player error:', error);
      onError?.(error);
    };

    player.addEventListener('timeupdate', handleTimeUpdate);
    player.addEventListener('ended', handleEnded);
    player.addEventListener('error', handleError);

    // Cleanup
    return () => {
      player.removeEventListener('timeupdate', handleTimeUpdate);
      player.removeEventListener('ended', handleEnded);
      player.removeEventListener('error', handleError);
    };
  }, [startTime, autoplay, onTimeUpdate, onEnded, onError]);

  // Construct the playback URL with token if provided
  let playbackUrl = `https://stream.mux.com/${playbackId}.m3u8`;
  if (playbackToken) {
    playbackUrl += `?token=${playbackToken}`;
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        streamType="on-demand"
        metadata={{
          video_id: playbackId,
          video_title: title,
          viewer_user_id: viewerUserId,
          video_series_title: 'Cinely',
          player_name: 'mux-player-react',
          player_version: '1.0.0',
          custom_1: 'cinely-platform',
          custom_2: playbackToken ? 'signed-playback' : 'public-playback',
        }}
        accentColor="#ea580c" // Cinely brand color
        controls
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default MuxPlayerComponent;
