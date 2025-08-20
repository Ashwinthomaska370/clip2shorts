import { createContext, useContext, useState, useEffect } from 'react'

const VideoContext = createContext()

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}

export const VideoProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('videoProjects')
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects))
      } catch (error) {
        console.error('Error loading projects from localStorage:', error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('videoProjects', JSON.stringify(projects))
  }, [projects])

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      title: projectData.title || `Project ${Date.now()}`,
      originalVideo: projectData.fileName,
      fileSize: `${projectData.fileSize} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'completed',
      shorts: projectData.shorts || []
    }
    
    setProjects(prev => [newProject, ...prev])
    return newProject
  }

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId))
  }

  const deleteShort = (projectId, shortId) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          shorts: project.shorts.filter(short => short.id !== shortId)
        }
      }
      return project
    }))
  }

  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ))
  }

  const value = {
    projects,
    addProject,
    deleteProject,
    deleteShort,
    updateProject,
    isLoading
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  )
}
