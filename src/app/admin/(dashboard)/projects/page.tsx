"use client";

import React, { useEffect, useState } from "react";
import { Upload, Edit3, Trash2, Plus, AlertCircle, Loader2, X } from "lucide-react";

export default function AdminProjectsSettings() {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsPageData, setProjectsPageData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<any>({ name: "", slug: "", category: "Residential", location: "", heroImage: "" });
  const [editingProject, setEditingProject] = useState<any | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchProjectsPageData();
  }, []);

  const fetchProjectsPageData = async () => {
    try {
      const res = await fetch(`/api/data/projectsPageData?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setProjectsPageData(data.data);
      }
    } catch (err) {
      console.error("Failed to load projects page data");
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/projects?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch projects");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load projects from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project? This will update the website instantly.")) return;
    
    const updatedProjects = projects.filter(p => p.slug !== slug);
    setProjects(updatedProjects);
    
    await fetch(`/api/data/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProjects)
    });
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.slug) return;
    
    // Add default empty fields for the rest of the project interface
    const projectToAdd = {
      ...newProject,
      client: "TBD",
      scope: "TBD",
      year: new Date().getFullYear(),
      heroImage: "/images/projects/residential-01.jpg",
      gallery: [],
      overview: "New project overview...",
      designConcept: "New design concept...",
      credits: []
    };
    
    const updatedProjects = [projectToAdd, ...projects];
    setProjects(updatedProjects);
    setIsModalOpen(false);
    setNewProject({ name: "", slug: "", category: "Residential", location: "", heroImage: "" });
    
    await fetch(`/api/data/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProjects)
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

  const saveProjectsPageData = async (updatedData: any) => {
    await fetch(`/api/data/projectsPageData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
  };

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...projectsPageData, heroImage: url };
      setProjectsPageData(updatedData);
      await saveProjectsPageData(updatedData);
    });
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.name || !editingProject.slug) return;
    
    const updatedProjects = projects.map(p => p.slug === editingProject.originalSlug ? { ...editingProject } : p);
    // Clean up temporary property
    updatedProjects.forEach(p => delete p.originalSlug);
    
    setProjects(updatedProjects);
    setIsEditModalOpen(false);
    setEditingProject(null);
    
    await fetch(`/api/data/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProjects)
    });
  };

  const openEditModal = (project: any) => {
    setEditingProject({ ...project, originalSlug: project.slug });
    setIsEditModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Hero Background Image Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-display text-white mb-4">Projects Page Hero Image</h2>
        <div className="flex flex-col gap-4">
          {projectsPageData.heroImage && (
            <div className="w-full h-48 rounded-xl overflow-hidden relative group">
              <img src={projectsPageData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
              <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm"><Upload size={20} /></div>
                <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
              </label>
            </div>
          )}
          
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image URL</label>
              <input 
                type="text" 
                value={projectsPageData.heroImage || ""} 
                onChange={e => {
                  const updatedData = {...projectsPageData, heroImage: e.target.value};
                  setProjectsPageData(updatedData);
                  saveProjectsPageData(updatedData);
                }}
                className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                placeholder="/images/backgrounds/..."
              />
            </div>
            {!projectsPageData.heroImage && (
              <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                <Upload size={14} /> Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Projects Grid */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-lg font-display text-white">Project Database</h2>
            <p className="text-xs font-body text-[var(--color-grey)] mt-1">Manage architectural lighting projects</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] text-xs font-display font-medium uppercase tracking-widest rounded-lg hover:bg-white transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Add New Project
          </button>
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
            <button onClick={fetchProjects} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
              Try Again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-[var(--color-grey)] text-sm">No projects found in the database. Add your first one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <div key={project.slug || i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                <div className="flex items-center gap-4">
                   {project.heroImage && (
                     <div className="w-16 h-12 bg-white/10 rounded overflow-hidden relative shrink-0">
                       <img src={project.heroImage} alt="cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                   )}
                   <div>
                     <h3 className="font-display text-white text-sm">{project.name || project.title}</h3>
                     <p className="font-body text-xs text-[var(--color-grey)] mt-1">{project.category} • {project.location}</p>
                   </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(project)}
                    className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" 
                    title="Edit"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.slug)}
                    className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" 
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add New Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Project Name</label>
                <input 
                  type="text" required
                  value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                {newProject.heroImage && (
                  <img src={newProject.heroImage} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newProject.heroImage || ''} 
                    onChange={e => setNewProject({...newProject, heroImage: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/projects/..."
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewProject({...newProject, heroImage: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">URL Slug (e.g. new-project)</label>
                <input 
                  type="text" required
                  value={newProject.slug} onChange={e => setNewProject({...newProject, slug: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Category</label>
                  <select 
                    value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  >
                    <option>Residential</option>
                    <option>Hospitality</option>
                    <option>Public Realm</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Location</label>
                  <input 
                    type="text" required
                    value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
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
              <h3 className="font-display text-white text-lg">Edit Project</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditProject} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                {editingProject.heroImage && (
                  <img src={editingProject.heroImage} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingProject.heroImage || ''} 
                    onChange={e => setEditingProject({...editingProject, heroImage: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/projects/..."
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingProject({...editingProject, heroImage: url}))} />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Project Name</label>
                <input 
                  type="text" required
                  value={editingProject.name} onChange={e => setEditingProject({...editingProject, name: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">URL Slug</label>
                <input 
                  type="text" required
                  value={editingProject.slug} onChange={e => setEditingProject({...editingProject, slug: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Category</label>
                  <select 
                    value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  >
                    <option>Residential</option>
                    <option>Hospitality</option>
                    <option>Public Realm</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Location</label>
                  <input 
                    type="text" required
                    value={editingProject.location} onChange={e => setEditingProject({...editingProject, location: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
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
