import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fetch } from '../utils/fetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await Fetch('/api/v1/users/me',{
          method: 'POST',
          credentials: 'include' 
        })
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logoutUser = async () => {
    try {
      await Fetch('/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include' 
      });
    } catch(error) {
      console.log(error)
    }
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Export separately so authFetch.js can use it without hook rules breaking
export function logoutUser() {
  localStorage.clear(); // just in case you store anything
  window.location.href = '/login'; // safest method if calling outside components
}
