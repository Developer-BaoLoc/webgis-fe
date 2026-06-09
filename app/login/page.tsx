'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();

  const { refreshUser } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        api.login,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Login failed',
        );
      }

      localStorage.setItem(
        'accessToken',
        data.accessToken,
      );

      await refreshUser();

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>WebGIS</h1>
          <p>
            Hệ thống quản lý dữ liệu
            không gian địa lý
          </p>
        </div>

        <div className="login-form">
          <label>Email</label>

          <input
            type="email"
            placeholder="admin@webgis.com"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value,
              )
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value,
              )
            }
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
          >
            {loading
              ? 'Đang đăng nhập...'
              : 'Đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
}