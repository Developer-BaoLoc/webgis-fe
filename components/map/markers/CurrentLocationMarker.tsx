'use client';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet';

interface Props {
  currentLocation: [number, number];
  currentWard: string;
}

export default function CurrentLocationMarker({
  currentLocation,
  currentWard,
}: Props) {
  const currentLocationIcon =
    L.divIcon({
      className: '',
      html: `
        <div
          style="
            width:18px;
            height:18px;
            border-radius:50%;
            background:#2196f3;
            border:3px solid white;
            box-shadow:0 0 12px #2196f3;
          "
        ></div>
      `,
      iconSize: [18, 18],
    });

  return (
    <Marker
      position={currentLocation}
      icon={currentLocationIcon}
    >
      <Popup>
        <b>📍 Vị trí của tôi</b>

        <br />
        <br />

        Bạn đang ở:

        <br />

        {currentWard}

        <br />

        Thành phố Cần Thơ
      </Popup>
    </Marker>
  );
}