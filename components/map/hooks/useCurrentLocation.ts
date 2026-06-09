import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] =
    useState<any>(null);

  const [currentWard, setCurrentWard] =
    useState('');

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCurrentLocation([lat, lng]);

        try {
          const res = await fetch(
            api.currentWard(lat, lng),
          );

          const data = await res.json();

          setCurrentWard(
            data?.name || 'Không xác định',
          );
        } catch (error) {
          console.error(error);
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }, []);

  return {
    currentLocation,
    currentWard,
  };
}