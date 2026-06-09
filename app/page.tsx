'use client';

import Map from '@/components/Map';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <Map />
    </ProtectedRoute>
  );
}