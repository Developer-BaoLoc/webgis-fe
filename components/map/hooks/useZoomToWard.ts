import { useState } from 'react';

export default function useZoomToWard(
  mapRef: any,
  wardLayersRef: any,
) {
  const [
    selectedWardId,
    setSelectedWardId,
  ] = useState<
    number | null
  >(null);

  const zoomToWard = (
    feature: any,
    clearSearch: () => void,
  ) => {
    const layer =
      wardLayersRef.current[
        feature.properties.name
      ];

    if (!layer) return;

    setSelectedWardId(
      feature.properties.osm_id,
    );

    clearSearch?.();

    mapRef.current?.fitBounds(
      layer.getBounds(),
      {
        padding: [80, 80],
        animate: true,
        duration: 1.5,
        maxZoom: 14,
      },
    );

    setTimeout(() => {
      layer.openPopup();
    }, 1200);

    setTimeout(() => {
      setSelectedWardId(null);
    }, 15000);
  };

  return {
    selectedWardId,
    zoomToWard,
  };
}