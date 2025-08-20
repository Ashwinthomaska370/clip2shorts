import { useState } from 'react'
import { useVideo } from '../contexts/VideoContext.jsx'
import { Video, Trash2, Play, Clock, Download, Share2, Eye, Calendar, FileText } from 'lucide-react'
import VideoPreview from '../components/VideoPreview.jsx'

function Projects() {
  const { projects, deleteProject, deleteShort } = useVideo()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [selectedShort, setSelectedShort] = useState(null)
  const [showVideoPreview, setShowVideoPreview] = useState(false)



  const handleDeleteProject = (projectId) => {
    deleteProject(projectId)
    setShowDeleteConfirm(null)
  }

  const handleDeleteShort = (projectId, shortId) => {
    deleteShort(projectId, shortId)
  }

  const handleVideoPreview = (short) => {
    console.log('Opening video preview for:', short);
    setSelectedShort(short)
    setShowVideoPreview(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }



  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">My Video Projects</h1>
          <p className="text-xl text-zinc-300">Manage and view all your video projects and generated shorts</p>
          
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
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Test Video Preview
          </button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
              {/* Project Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-fuchsia-500/20">
                    <Video className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {project.originalVideo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.fileSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(project.uploadDate)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                    {project.status}
                  </span>
                  <button
                    onClick={() => setShowDeleteConfirm(project.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Shorts Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">Generated Shorts ({project.shorts.length})</h4>
                  <button
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  >
                    {selectedProject === project.id ? 'Hide Shorts' : 'View Shorts'}
                  </button>
                </div>

                {selectedProject === project.id && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.shorts.map((short) => (
                      <div key={short.id} className="bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700/50">
                        <div className="relative group">
                          <img 
                            src={short.thumbnail} 
                            alt={short.title}
                            className="w-full h-40 object-cover transition-transform group-hover:scale-105 cursor-pointer"
                            onClick={() => handleVideoPreview(short)}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => handleVideoPreview(short)}
                              className="p-3 bg-white/20 rounded-full backdrop-blur hover:bg-white/30 transition-colors"
                            >
                              <Play className="w-6 h-6 text-white" />
                            </button>
                          </div>
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {short.duration}
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <h5 className="font-semibold text-white text-sm">{short.title}</h5>
                          <p className="text-zinc-300 text-xs leading-relaxed line-clamp-2">{short.caption}</p>
                          
                          <div className="flex flex-wrap gap-1">
                            {short.hashtags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="text-cyan-400 text-xs">#{tag.replace('#', '')}</span>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => handleVideoPreview(short)}
                            className="w-full mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition-all"
                          >
                            <Play className="w-4 h-4" />
                            Preview Video
                          </button>
                          
                          <div className="flex items-center justify-between text-xs text-zinc-400">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {short.views}
                              </span>
                              <span>❤️ {short.likes}</span>
                            </div>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleDeleteShort(project.id, short.id)}
                                className="p-1 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                title="Delete Short"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                              <button 
                                className="p-1 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                title="Download"
                              >
                                <Download className="w-3 h-3" />
                              </button>
                              <button 
                                className="p-1 text-zinc-400 hover:text-green-400 hover:bg-green-500/10 rounded transition-colors"
                                title="Share"
                              >
                                <Share2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 rounded-full bg-zinc-800/50 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Video className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
            <p className="text-zinc-400 mb-6">Start by uploading a video to generate your first shorts</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition-all">
              <Video className="w-5 h-5" />
              Upload Video
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Delete Project</h3>
            <p className="text-zinc-300 mb-6">
              Are you sure you want to delete this project? This action cannot be undone and will remove all associated shorts.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
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
  )
}

export default Projects
