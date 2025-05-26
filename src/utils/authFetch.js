import { logoutUser } from '../context/AuthContext';
import { baseURL } from '../constants';

export async function authFetch(url, options = {}) {
  let res = await fetch(`${baseURL}${url}`, { 
    ...options, 
    credentials: 'include' 
  });

  if (res.status === 401) {
    console.log("Since 401 trying to refresh token")
    // Access token likely expired -> try refresh
    const refreshRes = await fetch(`${baseURL}/api/v1/users/refreshAccessToken`, {
      method: 'POST',
      credentials: 'include'
    });

    if (refreshRes.ok) {
      // Refresh successful -> retry original request
      res = await fetch(`${baseURL}${url}`, { 
        ...options, 
        credentials: 'include' 
      });
    } else {
      // Refresh failed -> force logout
      logoutUser();
      throw new Error('Session expired. Please login again.');
    }
  }

  return res;
}
