import { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import { initShakaPlayerMux } from '@mux/mux-data-shakaplayer';

// Import Shaka Player CSS
import 'shaka-player/dist/controls.css';

interface ShakaPlayerProps {
  playbackId: string;
  playbackToken?: string;
  autoplay?: boolean;
  startTime?: number;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

const ShakaPlayer: React.FC<ShakaPlayerProps> = ({
  playbackId,
  playbackToken,
  autoplay = false,
  startTime = 0,
  onTimeUpdate,
  onEnded,
  onError,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPlayer = async () => {
      if (!videoRef.current) return;

      try {
        // Install built-in polyfills to patch browser incompatibilities
        shaka.polyfill.installAll();

        // Check if the browser is supported
        if (shaka.Player.isBrowserSupported()) {
          // Create a Player instance (using new recommended method)
          const player = new shaka.Player();
          playerRef.current = player;

          // Attach to video element
          await player.attach(videoRef.current);

          // Initialize Mux Data monitoring
          initShakaPlayerMux(player, {
            debug: import.meta.env.DEV,
            data: {
              env_key: import.meta.env.VITE_MUX_DATA_ENV_KEY || 'your-mux-data-env-key',
              // Video metadata
              video_id: playbackId,
              video_title: `Cinely Content - ${playbackId}`,
              video_series_title: 'Cinely',
              video_duration: 0, // Will be updated when video loads
              // Player metadata
              player_name: 'CinelyWeb',
              player_version: '1.0.0',
              // Viewer metadata
              viewer_user_id: 'demo-user', // In real app, get from auth context
              // Experiment metadata (optional)
              experiment_name: 'shaka-player-integration',
              // Custom metadata
              custom_1: 'cinely-platform',
              custom_2: playbackToken ? 'signed-playback' : 'public-playback',
            },
            // Advanced options
            automaticErrorTracking: true,
            beaconCollectionDomain: undefined, // Use default Mux domain
          });

          // Listen for player events
          player.addEventListener('error', (event) => {
            const error = event.detail;
            console.error('Shaka Player error:', error);
            setError(`Player error: ${error.code} - ${error.message}`);
            onError?.(error);
          });

          player.addEventListener('loadstart', () => {
            setIsLoading(true);
            setError(null);
          });

          player.addEventListener('loadeddata', () => {
            setIsLoading(false);
            
            // Set start time if provided
            if (startTime > 0) {
              player.seekTo(startTime);
            }
            
            // Set autoplay if requested
            if (autoplay) {
              videoRef.current?.play().catch(console.error);
            }
          });

          player.addEventListener('timeupdate', () => {
            if (videoRef.current) {
              onTimeUpdate?.(videoRef.current.currentTime, videoRef.current.duration);
            }
          });

          player.addEventListener('ended', () => {
            onEnded?.();
          });

          // Construct the manifest URL
          let manifestUrl = `https://stream.mux.com/${playbackId}.m3u8`;
          
          // Add token if provided
          if (playbackToken) {
            manifestUrl += `?token=${playbackToken}`;
          }

          // Load the manifest
          await player.load(manifestUrl);
          
          console.log('Shaka Player initialized with Mux Data monitoring');
        } else {
          throw new Error('Browser not supported by Shaka Player');
        }
      } catch (err) {
        console.error('Error initializing Shaka Player:', err);
        setError(`Failed to initialize player: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsLoading(false);
        onError?.(err);
      }
    };

    initPlayer();

    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playbackId, playbackToken, autoplay, startTime, onTimeUpdate, onEnded, onError]);

  const handlePlay = () => {
    videoRef.current?.play().catch(console.error);
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
        preload="metadata"
      />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <div className="text-red-400 mb-2">⚠️</div>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Custom controls overlay (optional) */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={handlePlay}
            className="p-2 bg-black/50 text-white rounded hover:bg-black/70"
            title="Play"
          >
            ▶️
          </button>
          <button
            onClick={handlePause}
            className="p-2 bg-black/50 text-white rounded hover:bg-black/70"
            title="Pause"
          >
            ⏸️
          </button>
        </div>
        
        <div className="text-white text-sm bg-black/50 px-2 py-1 rounded pointer-events-auto">
          {videoRef.current && (
            <>
              {Math.floor(videoRef.current.currentTime / 60)}:
              {Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0')} / 
              {Math.floor(videoRef.current.duration / 60)}:
              {Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0')}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShakaPlayer;
