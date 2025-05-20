import { create } from 'zustand';
import { User } from '../types';
import client from '../api/client';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await client.post('/auth/login', { email, password });
      if (response.data.user) {
        set({ 
          user: response.data.user, 
          isLoading: false,
          error: null,
          isInitialized: true
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      console.error('Login error:', error);
      set({ 
        user: null, 
        error: errorMessage, 
        isLoading: false,
        isInitialized: true
      });
      throw error;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await client.post('/auth/signup', { name, email, password });
      if (response.data.user) {
        set({ 
          user: response.data.user, 
          isLoading: false,
          error: null,
          isInitialized: true
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
      console.error('Signup error:', error);
      set({ 
        user: null, 
        error: errorMessage, 
        isLoading: false,
        isInitialized: true
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await client.post('/auth/logout');
      localStorage.removeItem('hasCheckedAuth');
      set({ 
        user: null, 
        isLoading: false,
        error: null,
        isInitialized: true
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
      console.error('Logout error:', error);
      set({ 
        error: errorMessage, 
        isLoading: false,
        isInitialized: true
      });
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await client.get('/auth/me');
      if (response.data.user) {
        set({ 
          user: response.data.user, 
          isLoading: false,
          error: null,
          isInitialized: true
        });
        localStorage.setItem('hasCheckedAuth', 'true');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      console.error('Check auth error:', error);
      localStorage.removeItem('hasCheckedAuth');
      set({ 
        user: null, 
        error: null, 
        isLoading: false, 
        isInitialized: true 
      });
    }
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore; 