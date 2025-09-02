import { useEffect, useRef, useState } from 'react';
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
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !isPlayerReady) return;

    // Wait for player to be ready before setting start time or autoplay
    const handleCanPlay = () => {
      if (startTime > 0) {
        player.currentTime = startTime;
      }
      
      if (autoplay) {
        // Use a small delay to ensure the player is fully ready
        setTimeout(() => {
          player.play().catch((error) => {
            console.warn('Autoplay failed:', error);
            // Don't treat autoplay failure as a critical error
          });
        }, 100);
      }
    };

    // Add event listeners
    const handleTimeUpdate = () => {
      if (player.duration && !isNaN(player.duration)) {
        onTimeUpdate?.(player.currentTime, player.duration);
      }
    };

    const handleEnded = () => {
      onEnded?.();
    };

    const handleError = (event: Event) => {
      const error = (event.target as HTMLVideoElement)?.error;
      console.error('Mux Player error:', error);
      setHasError(true);
      onError?.(error);
    };

    const handleLoadStart = () => {
      setHasError(false);
    };

    player.addEventListener('canplay', handleCanPlay);
    player.addEventListener('timeupdate', handleTimeUpdate);
    player.addEventListener('ended', handleEnded);
    player.addEventListener('error', handleError);
    player.addEventListener('loadstart', handleLoadStart);

    // Cleanup
    return () => {
      player.removeEventListener('canplay', handleCanPlay);
      player.removeEventListener('timeupdate', handleTimeUpdate);
      player.removeEventListener('ended', handleEnded);
      player.removeEventListener('error', handleError);
      player.removeEventListener('loadstart', handleLoadStart);
    };
  }, [startTime, autoplay, onTimeUpdate, onEnded, onError, isPlayerReady]);

  const handlePlayerReady = () => {
    setIsPlayerReady(true);
  };

  if (hasError) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        <div className="text-center text-white p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Video Error</h3>
          <p className="text-gray-300 mb-4">There was an issue loading this video.</p>
          <button 
            onClick={() => {
              setHasError(false);
              setIsPlayerReady(false);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
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
        autoPlay={false} // Let our custom logic handle autoplay
        startTime={0} // Let our custom logic handle start time
        onLoadedData={handlePlayerReady}
        style={{
          width: '100%',
          height: '100%',
        }}
        // Add token as a prop if provided
        {...(playbackToken && { playbackToken })}
      />
    </div>
  );
};

export default MuxPlayerComponent;
