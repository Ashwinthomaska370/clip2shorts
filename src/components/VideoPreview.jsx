import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, AlertCircle } from 'lucide-react';

const VideoPreview = ({ isOpen, onClose, short }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  // Debug logging
  useEffect(() => {
    console.log('VideoPreview props:', { isOpen, short });
    if (short) {
      console.log('Short data:', short);
      console.log('Video URL:', short.videoUrl);
      console.log('Short type:', typeof short);
      console.log('Short keys:', Object.keys(short));
      
      // Test CORS if it's an external URL
      if (short.videoUrl && short.videoUrl.startsWith('http')) {
        testCORS(short.videoUrl);
      }
    }
  }, [isOpen, short]);

  useEffect(() => {
    if (isOpen && short) {
      setIsPlaying(false);
      setCurrentTime(0);
      setError(null);
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen, short]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
        setIsLoading(false);
        console.log('Video metadata loaded, duration:', videoRef.current.duration);
      }
    };

    const handleError = (e) => {
      console.error('Video error:', e);
      const video = e.target;
      let errorMessage = 'Failed to load video. Please check the video URL.';
      
      if (video.error) {
        switch (video.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = 'Video loading was aborted.';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error. This might be a CORS issue.';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = 'Video decoding error.';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Video format not supported or CORS blocked.';
            break;
          default:
            errorMessage = 'Unknown video error occurred.';
        }
      }
      
      setError(errorMessage);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      console.log('Video can play');
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Playback error:', error);
        setError('Failed to play video. Please try again.');
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickPercent = clickX / rect.width;
      const newTime = clickPercent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const testCORS = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      console.log('CORS test result:', response.ok, response.headers);
      return response.ok;
    } catch (error) {
      console.error('CORS test failed:', error);
      return false;
    }
  };



  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !short) {
    console.log('VideoPreview: Not open or no short data', { isOpen, short });
    return null;
  }

  // Check if short has required properties
  if (!short.videoUrl) {
    console.error('VideoPreview: Missing videoUrl in short data', short);
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700/50 p-6">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-white text-lg mb-2">Video Preview Error</h3>
            <p className="text-red-400 mb-4">Missing video URL in the short data.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700/50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-zinc-800/50 border-b border-zinc-700/50">
          <div>
            <h3 className="text-lg font-semibold text-white">{short.title}</h3>
            <p className="text-sm text-zinc-400">{short.caption}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
                <p className="text-white">Loading video...</p>
              </div>
            </div>
          )}
          
                     {error && (
             <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
               <div className="text-center">
                 <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                 <p className="text-white text-lg mb-2">Video Error</p>
                 <p className="text-red-400">{error}</p>
                 {error.includes('CORS') && (
                   <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                     <p className="text-yellow-300 text-sm">
                       <strong>CORS Issue:</strong> This video server doesn't allow cross-origin requests. 
                       Try using a different video source or check the console for CORS test results.
                     </p>
                   </div>
                 )}
                 <button
                   onClick={() => {
                     setError(null);
                     setIsLoading(true);
                     if (videoRef.current) {
                       videoRef.current.load();
                     }
                   }}
                   className="mt-4 px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
                 >
                   Retry
                 </button>
               </div>
             </div>
           )}

                    <video
            ref={videoRef}
            className="w-full h-auto max-h-[60vh] object-contain bg-black"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration);
              }
            }}
            onError={(e) => {
              console.error('Video element error:', e);
              setError('Video failed to load. Please check the URL.');
              setIsLoading(false);
            }}
            onLoadStart={() => {
              console.log('Video load started');
              setIsLoading(true);
            }}
            onCanPlay={() => {
              console.log('Video can play');
              setIsLoading(false);
            }}
            controls={false}
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={short.videoUrl} type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                ref={progressRef}
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                onClick={handleProgressClick}
                className="w-full h-2 bg-zinc-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fuchsia-500 0%, #fuchsia-500 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  disabled={!!error}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>

                <button
                  onClick={resetVideo}
                  className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  disabled={!!error}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    disabled={!!error}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer slider"
                    disabled={!!error}
                  />
                </div>

                <span className="text-sm text-zinc-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>


            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4 bg-zinc-800/50 border-t border-zinc-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            {short.hashtags && short.hashtags.slice(0, 5).map((tag, index) => (
              <span key={index} className="text-cyan-400 text-sm">#{tag.replace('#', '')}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>Duration: {formatTime(short.duration)}</span>
            <span>Start Time: {formatTime(short.startTime)}</span>
          </div>
          {short.videoUrl && (
            <div className="mt-2 text-xs text-zinc-500 break-all">
              Video URL: {short.videoUrl}
            </div>
          )}
          <div className="mt-2 text-xs text-zinc-500">
            Video Status: {isLoading ? 'Loading...' : error ? 'Error' : 'Ready'}
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            CORS: {short.videoUrl?.startsWith('http') ? 'External' : 'Local'} | 
            URL: {short.videoUrl?.substring(0, 50)}...
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fuchsia-500;
          cursor: pointer;
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fuchsia-500;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default VideoPreview;
