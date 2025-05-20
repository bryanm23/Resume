import React, { useState } from 'react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  securityFeatures?: string[];
  github?: string;
  link?: string;
  type: 'offensive' | 'defensive' | 'research' | 'tool';
}

interface ProjectEditorProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onCancel }) => {
  const [editedProject, setEditedProject] = useState<Project>({ ...project });
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    if (newTech.trim()) {
      setEditedProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setEditedProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setEditedProject(prev => ({
        ...prev,
        securityFeatures: [...(prev.securityFeatures || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setEditedProject(prev => ({
      ...prev,
      securityFeatures: prev.securityFeatures?.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProject);
  };

  return (
    <div className="cyber-card p-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Edit Project</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Project Name</label>
          <input
            type="text"
            name="name"
            value={editedProject.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={editedProject.description}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500 h-32"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={editedProject.github || ''}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Live URL</label>
          <input
            type="url"
            name="link"
            value={editedProject.link || ''}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Project Type</label>
          <select
            name="type"
            value={editedProject.type}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500"
          >
            <option value="offensive">Offensive</option>
            <option value="defensive">Defensive</option>
            <option value="research">Research</option>
            <option value="tool">Tool</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Technologies</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editedProject.technologies.map((tech) => (
              <div key={tech} className="flex items-center bg-gray-700 px-3 py-1 rounded">
                <span className="text-gray-300">{tech}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              className="flex-1 bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded-l focus:outline-none focus:border-cyan-500"
              placeholder="Add technology..."
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="bg-cyan-600 text-white px-3 py-2 rounded-r hover:bg-cyan-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Security Features</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editedProject.securityFeatures?.map((feature) => (
              <div key={feature} className="flex items-center bg-gray-700 px-3 py-1 rounded">
                <span className="text-gray-300">{feature}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feature)}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 bg-gray-800 border border-cyan-500/30 text-white px-3 py-2 rounded-l focus:outline-none focus:border-cyan-500"
              placeholder="Add security feature..."
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-cyan-600 text-white px-3 py-2 rounded-r hover:bg-cyan-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700"
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEditor; 