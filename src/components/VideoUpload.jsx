import { useState, useRef } from 'react';
import { useVideo } from '../contexts/VideoContext.jsx';
import { Upload, Video, Download, Loader2, CheckCircle, AlertCircle, Scissors, Play, Clock, Hash, Share2, Instagram, Twitter, Facebook, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import VideoPreview from './VideoPreview.jsx';

const VideoUpload = () => {
  const { addProject } = useVideo();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [shorts, setShorts] = useState([]);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [selectedShort, setSelectedShort] = useState(null);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
      setShorts([]);
    } else {
      setError('Please select a valid video file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
      setError(null);
      setResult(null);
      setShorts([]);
    } else {
      setError('Please drop a valid video file');
    }
  };

  const handleVideoPreview = (short) => {
    console.log('Opening video preview for:', short);
    setSelectedShort(short);
    setShowVideoPreview(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const simulateUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress(Math.min(progress, 100));
      }, 200);
    });
  };

  const generateMockShorts = (videoFile) => {
    const videoName = videoFile.name.replace(/\.[^/.]+$/, ""); // Remove file extension
    const fileSize = videoFile.size / (1024 * 1024); // Size in MB
    
    // Generate 3-5 mock shorts based on video characteristics
    const numShorts = Math.min(Math.max(Math.floor(fileSize / 10), 3), 5);
    const mockShorts = [];
    
    for (let i = 1; i <= numShorts; i++) {
      const startTime = Math.floor(Math.random() * 60) + (i - 1) * 30;
      const duration = Math.floor(Math.random() * 15) + 15; // 15-30 seconds
      
      mockShorts.push({
        id: i,
        title: `${videoName} - Short ${i}`,
        startTime: startTime,
        duration: duration,
        endTime: startTime + duration,
        caption: generateMockCaption(videoName, i),
        hashtags: generateMockHashtags(),
        thumbnail: `https://picsum.photos/300/400?random=${i}`,
        videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`, // Mock video URL
        status: 'ready'
      });
    }
    
    return mockShorts;
  };

  const generateMockCaption = (videoName, shortNum) => {
    const captions = [
      `🎬 The most epic moment from ${videoName}! You won't believe what happens next...`,
      `🔥 This ${videoName} clip is absolutely insane! Drop a ❤️ if you agree!`,
      `⚡️ The highlight of ${videoName} - pure magic captured in ${shortNum} seconds!`,
      `🎯 This ${videoName} moment changed everything! What do you think?`,
      `🚀 From ${videoName} - this is what peak performance looks like!`,
      `💫 The best part of ${videoName} - pure gold! 🔥`,
      `🎪 ${videoName} never disappoints! This clip proves it!`,
      `🌟 ${videoName} magic in action! Can't stop watching!`
    ];
    
    return captions[Math.floor(Math.random() * captions.length)];
  };

  const generateMockHashtags = () => {
    const allHashtags = [
      '#viral', '#trending', '#shorts', '#fyp', '#foryou', '#viralvideo', 
      '#trendingnow', '#mustwatch', '#amazing', '#incredible', '#mindblowing',
      '#viralcontent', '#trendingvideo', '#shortsfeed', '#fypシ', '#foryoupage'
    ];
    
    const numHashtags = Math.floor(Math.random() * 5) + 5; // 5-10 hashtags
    const shuffled = allHashtags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numHashtags);
  };

  const simulateVideoProcessing = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 8;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress(Math.min(progress, 100));
      }, 300);
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate file upload
      await simulateUpload();
      
      // Simulate AI video processing
      setIsProcessing(true);
      setUploadProgress(0);
      await simulateVideoProcessing();
      
      // Generate mock shorts
      const generatedShorts = generateMockShorts(file);
      setShorts(generatedShorts);
      
      // Save project to context
      const projectData = {
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension for title
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2),
        totalShorts: generatedShorts.length,
        timestamp: new Date().toLocaleString(),
        shorts: generatedShorts
      };
      
      addProject(projectData);
      
      setResult({
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2),
        totalShorts: generatedShorts.length,
        timestamp: new Date().toLocaleString()
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setUploadProgress(0);
    setShorts([]);
    setShowDownloadOptions(false);
    setShowShareOptions(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadShortsReport = () => {
    const report = `Video Shorts Analysis Report\n\n` +
      `File: ${result.fileName}\n` +
      `Size: ${result.fileSize} MB\n` +
      `Total Shorts Generated: ${result.totalShorts}\n` +
      `Processed on: ${result.timestamp}\n\n` +
      `SHORTS DETAILS:\n` +
      shorts.map(short => 
        `${short.title}\n` +
        `Duration: ${formatTime(short.duration)}\n` +
        `Timeline: ${formatTime(short.startTime)} - ${formatTime(short.endTime)}\n` +
        `Caption: ${short.caption}\n` +
        `Hashtags: ${short.hashtags.join(' ')}\n`
      ).join('\n---\n\n');

    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `shorts-analysis-${result.fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAllShorts = () => {
    // Simulate downloading all shorts
    alert('Downloading all shorts... This would download all generated video clips in a real application.');
  };

  const downloadIndividualShort = (shortId) => {
    // Simulate downloading individual short
    alert(`Downloading Short ${shortId}... This would download the specific video clip in a real application.`);
  };

  const shareToSocialMedia = (platform, shortId = null) => {
    const short = shortId ? shorts.find(s => s.id === shortId) : null;
    const content = short ? `${short.caption}\n\n${short.hashtags.join(' ')}` : `Check out my new video shorts generated with AI! 🎬✨`;
    
    let shareUrl = '';
    let message = '';
    
    switch (platform) {
      case 'instagram':
        message = 'Instagram sharing would open the app with pre-filled content';
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content)}`;
        break;
      case 'youtube':
        message = 'YouTube sharing would open the platform with pre-filled content';
        break;
      case 'tiktok':
        message = 'TikTok sharing would open the app with pre-filled content';
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(content)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    } else if (message) {
      alert(message);
    }
  };

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700' },
    { id: 'tiktok', name: 'TikTok', icon: Hash, color: 'from-pink-500 to-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800' },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">AI Video Shorts Generator</h2>
        <p className="text-zinc-300">Upload your video and let AI automatically cut it into engaging short-form content</p>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-green-500 bg-green-500/10' : 'border-zinc-600 hover:border-zinc-500'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-zinc-800">
                  <Video className="w-8 h-8 text-zinc-300" />
                </div>
              </div>
              
              <div>
                <p className="text-lg font-medium text-white mb-2">
                  {file ? file.name : 'Drop your video here or click to browse'}
                </p>
                <p className="text-sm text-zinc-400">
                  {file ? `Size: ${formatFileSize(file.size)}` : 'Supports MP4, MOV, AVI, and more'}
                </p>
              </div>
              
              {!file && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition-all"
                >
                  <Upload className="w-5 h-5" />
                  Choose Video File
                </button>
              )}
            </div>
          </div>

          {/* File Info */}
          {file && (
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">{file.name}</p>
                    <p className="text-sm text-zinc-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {file && (
            <div className="text-center">
              <button
                onClick={handleUpload}
                disabled={isUploading || isProcessing}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white font-semibold rounded-lg hover:from-fuchsia-600 hover:via-purple-600 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading || isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isUploading ? 'Uploading...' : 'AI Processing Video...'}
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5" />
                    Generate Shorts
                  </>
                )}
              </button>
            </div>
          )}

          {/* Upload Progress */}
          {(isUploading || isProcessing) && uploadProgress > 0 && (
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300">
                  {isUploading ? 'Upload Progress' : 'AI Processing Progress'}
                </span>
                <span className="text-sm text-zinc-300">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-fuchsia-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Display */
        <div className="space-y-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Video Processing Complete!</h3>
            </div>
            
            {/* Test Video Preview Button */}
            <button
              onClick={() => {
                const testShort = {
                  id: 'test',
                  title: 'Test Video',
                  caption: 'This is a test video for debugging',
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  hashtags: ['#test', '#debug'],
                  duration: 10,
                  startTime: 0
                };
                console.log('Testing with short:', testShort);
                setSelectedShort(testShort);
                setShowVideoPreview(true);
              }}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Test Video Preview
            </button>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-sm text-zinc-400 mb-1">File Name</p>
                <p className="text-white font-medium">{result.fileName}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-sm text-zinc-400 mb-1">File Size</p>
                <p className="text-white font-medium">{result.fileSize} MB</p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-sm text-zinc-400 mb-1">Shorts Generated</p>
                <p className="text-white font-medium">{result.totalShorts}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400">Processed on: {result.timestamp}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <Download className="w-5 h-5" />
              Download Options
            </button>
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Options
            </button>
          </div>

          {/* Download Options Modal */}
          {showDownloadOptions && (
            <div className="bg-zinc-800/80 backdrop-blur-sm rounded-lg p-6 border border-zinc-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Download Options</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={downloadAllShorts}
                  className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-medium hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <Download className="w-6 h-6 mx-auto mb-2" />
                  Download All Shorts
                  <p className="text-sm opacity-90">Get all generated shorts in one package</p>
                </button>
                <button
                  onClick={downloadShortsReport}
                  className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  <Download className="w-6 h-6 mx-auto mb-2" />
                  Download Report
                  <p className="text-sm opacity-90">Get detailed analysis and captions</p>
                </button>
              </div>
            </div>
          )}

          {/* Share Options Modal */}
          {showShareOptions && (
            <div className="bg-zinc-800/80 backdrop-blur-sm rounded-lg p-6 border border-zinc-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Share to Social Media</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => shareToSocialMedia(platform.id)}
                    className={`p-4 bg-gradient-to-r ${platform.color} rounded-lg text-white font-medium hover:brightness-110 transition-all flex flex-col items-center gap-2`}
                  >
                    <platform.icon className="w-6 h-6" />
                    <span className="text-sm">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Shorts Grid */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white text-center">Generated Shorts</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shorts.map((short) => (
                <div key={short.id} className="bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700/50">
                  <div className="relative group">
                    <img 
                      src={short.thumbnail} 
                      alt={short.title}
                      className="w-full h-48 object-cover cursor-pointer transition-transform group-hover:scale-105"
                      onClick={() => handleVideoPreview(short)}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {formatTime(short.duration)}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {formatTime(short.startTime)} - {formatTime(short.endTime)}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleVideoPreview(short)}
                        className="p-3 bg-white/20 rounded-full backdrop-blur hover:bg-white/30 transition-colors"
                      >
                        <Play className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h4 className="font-semibold text-white text-sm">{short.title}</h4>
                    <p className="text-zinc-300 text-xs leading-relaxed">{short.caption}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {short.hashtags.slice(0, 5).map((tag, index) => (
                        <span key={index} className="text-cyan-400 text-xs">#{tag.replace('#', '')}</span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Clock className="w-3 h-3" />
                        {formatTime(short.duration)}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleVideoPreview(short)}
                          className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs px-2 py-1 rounded hover:from-fuchsia-600 hover:to-purple-700 transition-all"
                        >
                          <Play className="w-3 h-3 inline mr-1" />
                          Preview
                        </button>
                        <button 
                          onClick={() => downloadIndividualShort(short.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded hover:from-green-600 hover:to-emerald-700 transition-all"
                        >
                          <Download className="w-3 h-3 inline mr-1" />
                          Download
                        </button>
                        <button 
                          onClick={() => shareToSocialMedia('instagram', short.id)}
                          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-1 rounded hover:from-pink-600 hover:to-purple-700 transition-all"
                        >
                          <Share2 className="w-3 h-3 inline mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-zinc-700 text-white font-medium rounded-lg hover:bg-zinc-600 transition-colors"
            >
              Process Another Video
            </button>
            <button
              onClick={() => window.location.href = '/projects'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <Video className="w-5 h-5" />
              View All Projects
            </button>
            <button
              onClick={downloadShortsReport}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition-all"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      <VideoPreview
        isOpen={showVideoPreview}
        onClose={() => setShowVideoPreview(false)}
        short={selectedShort}
      />
    </div>
  );
};

export default VideoUpload;
