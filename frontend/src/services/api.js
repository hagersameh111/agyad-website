const API_URL = "http://localhost:9000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token 
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};

// --- AUTH ---
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// --- PROJECTS ---
export const fetchProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);
  const json = await res.json();
  return json.data || [];
};

export const fetchProjectById = async (id) => {
  const res = await fetch(`${API_URL}/projects/${id}`);
  const json = await res.json();
  return json.data;
};

export const createProject = async (projectData) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(projectData),
  });
  return res.json();
};

export const updateProject = async (id, projectData) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(projectData),
  });
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

// --- GALLERY ---
export const fetchGallery = async () => {
  const res = await fetch(`${API_URL}/gallery`);
  const json = await res.json();
  return json.data || [];
};

// --- PAGE DATA (Preserved for existing frontend components) ---
export const fetchAllProjectsPageData = async () => {
  const response = await fetch('/api/all-projects.json');
  return await response.json();
};

export const fetchSettings = async () => {
  const response = await fetch('/api/settings.json');
  return await response.json();
};