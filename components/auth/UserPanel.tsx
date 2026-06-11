'use client';

import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';

export default function UserPanel() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: 50,
        zIndex: 9999,
        background: '#fff',
        padding: 12,
        borderRadius: 12,
        boxShadow:
          '0 2px 10px rgba(0,0,0,.15)',
        minWidth: 220,
      }}
    >
      {!user ? (
        <>
          <div
            style={{
              color: '#666',
              marginBottom: 10,
            }}
          >
            Not logged in
          </div>
          <Link
            href="/login"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '8px 12px',
              background: '#2563eb',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        </>
      ) : (
        <>
          <div>
            <strong>{user.email}</strong>
          </div>
          <div
            style={{
              marginTop: 4,
              color: '#666',
            }}
          >
            Role: {user.role}
          </div>
          {user.role === 'ADMIN' && (
            <Link
              href="/admin"
              style={{
                display: 'block',
                marginTop: 10,
                textAlign: 'center',
                padding: '8px 12px',
                background: '#111827',
                color: '#fff',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            style={{
              marginTop: 10,
              width: '100%',
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
