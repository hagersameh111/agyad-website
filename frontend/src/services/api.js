// Mock API service - Replace URLs with your future backend endpoints (e.g., http://localhost:5000/api)

export const fetchProjects = async () => {
  const response = await fetch('/api/projects.json');
  return await response.json();
};

export const fetchProjectById = async (id) => {
  const projects = await fetchProjects();
  return projects.find(p => p.id === id);
};

// Admin Ready: Placeholder functions for your future Admin panel
export const createProject = async (projectData) => {
  // Example: await axios.post('/api/projects', projectData);
  console.log("Simulating backend project creation:", projectData);
  return { success: true };
};

export const deleteProject = async (id) => {
  // Example: await axios.delete(`/api/projects/${id}`);
  console.log("Simulating backend project deletion for ID:", id);
  return { success: true };
};

export const fetchGallery = async () => {
  const response = await fetch('/api/gallery.json');
  return await response.json();
};

export const fetchSettings = async () => {
  const response = await fetch('/api/settings.json');
  return await response.json();
};
export const fetchAllProjectsPageData = async () => {
  const response = await fetch('/api/all-projects.json');
  return await response.json();
};