"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminHomeSettings() {
  const [homeData, setHomeData] = useState<any>({ featuredProjects: [], heroImages: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ id: 0, title: "", visibility: "Homepage", imageUrl: "" });
  const [editingProject, setEditingProject] = useState<any | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/homeData?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setHomeData(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch home data");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load home data from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveHomeData = async (updatedData: any) => {
    await fetch(`/api/data/homeData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        callback(data.url);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this project from the homepage?")) return;
    
    const updatedProjects = homeData.featuredProjects.filter((p: any) => p.id !== id);
    const updatedData = { ...homeData, featuredProjects: updatedProjects };
    setHomeData(updatedData); 
    await saveHomeData(updatedData);
  };

  const handleAddHeroImage = async (url: string) => {
    const updatedImages = [...(homeData.heroImages || []), url];
    const updatedData = { ...homeData, heroImages: updatedImages };
    setHomeData(updatedData);
    await saveHomeData(updatedData);
  };

  const handleDeleteHeroImage = async (index: number) => {
    if (!confirm("Remove this hero image?")) return;
    const updatedImages = [...(homeData.heroImages || [])];
    updatedImages.splice(index, 1);
    const updatedData = { ...homeData, heroImages: updatedImages };
    setHomeData(updatedData);
    await saveHomeData(updatedData);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    
    const projectToAdd = { ...newProject, id: new Date().getTime() };
    const updatedProjects = [...(homeData.featuredProjects || []), projectToAdd];
    const updatedData = { ...homeData, featuredProjects: updatedProjects };
    
    setHomeData(updatedData);
    setIsModalOpen(false);
    setNewProject({ id: 0, title: "", visibility: "Homepage", imageUrl: "" });
    
    await saveHomeData(updatedData);
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;
    
    const updatedProjects = homeData.featuredProjects.map((p: any) => p.id === editingProject.id ? { ...editingProject } : p);
    const updatedData = { ...homeData, featuredProjects: updatedProjects };
    
    setHomeData(updatedData);
    setIsEditModalOpen(false);
    setEditingProject(null);
    
    await saveHomeData(updatedData);
  };

  const openEditModal = (project: any) => {
    setEditingProject({ ...project });
    setIsEditModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-grey)]">
                Studio Operations // Homepage
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Homepage Settings
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage the featured projects and hero background images displayed on the homepage.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              Add Featured Project
            </button>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Featured Projects</h2>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-[var(--color-grey)]">
              <Loader2 size={32} className="animate-spin mb-4" />
              <p className="text-sm font-display tracking-widest uppercase">Loading Database...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <AlertCircle size={32} className="text-red-500 mb-4" />
              <h3 className="text-white font-display text-lg mb-2">Connection Error</h3>
              <p className="text-red-400 text-sm max-w-md">{error}</p>
              <button onClick={fetchHomeData} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
                Try Again
              </button>
            </div>
          ) : (!homeData.featuredProjects || homeData.featuredProjects.length === 0) ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No featured projects found. Add one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {homeData.featuredProjects.map((project: any) => (
                <div key={project.id} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex items-center gap-4">
                     {project.imageUrl && (
                       <div className="w-16 h-12 bg-white/10 rounded overflow-hidden relative shrink-0">
                         <img src={project.imageUrl} alt="cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                       </div>
                     )}
                     <div>
                       <h3 className="font-display text-white text-sm">{project.title}</h3>
                       <p className="font-body text-[10px] text-[var(--color-grey)] mt-1 uppercase tracking-widest">Visibility: {project.visibility}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(project)} className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hero Images Section */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Hero Background Images</h2>
            <label className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-[10px] font-display uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">
              <Upload size={14} />
              Upload Image
              <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, handleAddHeroImage)} />
            </label>
          </div>
          
          {(!homeData.heroImages || homeData.heroImages.length === 0) ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No custom hero images uploaded. Using default fallback images.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {homeData.heroImages.map((imgUrl: string, index: number) => (
                <div key={index} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <img src={imgUrl} alt={`Hero ${index}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button onClick={() => handleDeleteHeroImage(index)} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add Featured Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                {newProject.imageUrl && (
                  <img src={newProject.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newProject.imageUrl || ''} 
                    onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewProject({...newProject, imageUrl: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Project Title</label>
                <input 
                  type="text" required
                  value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Featured Project</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditProject} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                {editingProject.imageUrl && (
                  <img src={editingProject.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingProject.imageUrl || ''} 
                    onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingProject({...editingProject, imageUrl: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Project Title</label>
                <input 
                  type="text" required
                  value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
