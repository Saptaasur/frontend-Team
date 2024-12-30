const BASE_URL = "https://backend-team-ciph.onrender.com/api";

export const fetchOrganizations = async () => {
  const response = await fetch(`${BASE_URL}/organizations`);
  return response.json();
};

export const createOrganization = async (data: { name: string; email: string; location: string }) => {
  const response = await fetch(`${BASE_URL}/organizations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const fetchTeams = async () => {
  const response = await fetch(`${BASE_URL}/teams`);
  return response.json();
};

export const fetchMembers = async () => {
  const response = await fetch(`${BASE_URL}/members`);
  return response.json();
};

// Create a member without the image
export const createMember = async (data: { name: string; teamId: string; uniqueId: string }) => {
  const response = await fetch(`${BASE_URL}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Image upload for a member
export const uploadImage = async (formData: FormData) => {
  const response = await fetch(`${BASE_URL}/members/upload`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const createTeam = async (data: { name: string; organizationId: string }) => {
  const response = await fetch(`${BASE_URL}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
