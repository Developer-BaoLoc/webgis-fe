'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '@/lib/api';

import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;

  loading: boolean;

  logout: () => void;

  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  const loadUser = async () => {
    try {
      const token =
        localStorage.getItem(
          'accessToken',
        );

      if (!token) {
        setUser(null);
        return;
      }

      const response =
        await fetch(api.me, {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        localStorage.removeItem(
          'accessToken',
        );

        setUser(null);

        return;
      }

      const data =
        await response.json();

      setUser(data);
    } catch (error) {
      console.error(error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem(
      'accessToken',
    );

    setUser(null);

    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}