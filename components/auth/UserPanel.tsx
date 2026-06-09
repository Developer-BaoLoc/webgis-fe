'use client';

import { useAuth } from '@/context/AuthContext';

export default function UserPanel() {
  const {
    user,
    logout,
  } = useAuth();

  if (!user) return null;

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
      <div>
        <strong>
          {user.email}
        </strong>
      </div>

      <div
        style={{
          marginTop: 4,
          color: '#666',
        }}
      >
        Role: {user.role}
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: 10,
          width: '100%',
        }}
      >
        Logout
      </button>
    </div>
  );
}