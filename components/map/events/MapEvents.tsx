'use client';

import { useMapEvents } from 'react-leaflet';

interface Props {
  onRoadsEnable: () => void;
  onRiversEnable: () => void;
}

export default function MapEvents({
  onRoadsEnable,
  onRiversEnable,
}: Props) {
  useMapEvents({
    overlayadd(event) {
      const name =
        (event as any).layer?.options?.name;

      if (name === 'Roads') {
        onRoadsEnable();
      }

      if (name === 'Rivers') {
        onRiversEnable();
      }
    },
  });

  return null;
}