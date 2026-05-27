import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

// Attach JWT access token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh the access token using the stored refresh token. We use raw axios
// (not apiClient) to avoid an infinite loop if the refresh call itself fails.
let refreshPromise = null;

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;
  const refreshToken = localStorage.getItem('refresh');
  if (!refreshToken) throw new Error('No refresh token');

  refreshPromise = axios
    .post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken })
    .then(({ data }) => {
      localStorage.setItem('access', data.access);
      if (data.refresh) localStorage.setItem('refresh', data.refresh);
      return data.access;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

function logoutAndRedirect() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('isSuperAdmin');
  if (window.location.pathname !== '/') {
    window.location.href = '/';
  } else {
    // Force a re-render so App.jsx sees the missing token
    window.dispatchEvent(new Event('auth:logout'));
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    // Don't try to refresh on the refresh endpoint itself or after retrying once
    const isRefreshCall = original?.url?.includes('/api/token/refresh/');
    if (status === 401 && !isRefreshCall && !original._retry) {
      original._retry = true;
      try {
        const newAccess = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch {
        logoutAndRedirect();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
