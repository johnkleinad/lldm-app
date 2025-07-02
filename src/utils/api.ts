import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

async function getAuthHeaders() {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {
      'Content-Type': 'application/json',
    };
  }
}

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Funciones específicas para la API
export const api = {
  // Grupos
  getGroups: () => apiCall('/groups'),
  createGroup: (group: any) => apiCall('/groups', {
    method: 'POST',
    body: JSON.stringify(group),
  }),
  
  // Usuarios
  getUsers: () => apiCall('/users'),
  getUsersByGroup: (groupId: string) => apiCall(`/groups/${groupId}/users`),
  
  // Asignaciones
  getAssignments: (month: number, year: number) => 
    apiCall(`/assignments?month=${month}&year=${year}`),
  createAssignment: (assignment: any) => apiCall('/assignments', {
    method: 'POST',
    body: JSON.stringify(assignment),
  }),
  updateAssignment: (id: string, assignment: any) => apiCall(`/assignments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(assignment),
  }),
  
  // Calendario
  publishCalendar: (month: number, year: number) => apiCall('/calendar/publish', {
    method: 'POST',
    body: JSON.stringify({ month, year }),
  }),
  
  // Confirmaciones
  confirmAssignment: (assignmentId: string, confirmed: boolean) => 
    apiCall(`/assignments/${assignmentId}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ confirmed }),
    }),
};