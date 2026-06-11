import L, { type CircleMarkerOptions } from 'leaflet';

import { resolveMediaUrl } from '@/lib/media';

interface CreatePointMarkerOptions {
  pane: string;
  defaultStyle: CircleMarkerOptions;
  selectedIconSize?: [number, number];
  defaultIconSize?: [number, number];
}

export function createPointMarker(
  feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
  options: CreatePointMarkerOptions,
) {
  const iconUrl = feature.properties?.icon as
    | string
    | undefined;

  if (iconUrl) {
    const size =
      options.defaultIconSize ?? [32, 32];
    const resolvedUrl = resolveMediaUrl(iconUrl);

    const marker = L.marker(latlng, {
      pane: options.pane,
      icon: L.icon({
        iconUrl: resolvedUrl,
        iconSize: size,
        iconAnchor: [size[0] / 2, size[1]],
        popupAnchor: [0, -size[1] + 4],
      }),
    });

    // Add error listener to log failed icon loads for debugging
    marker.on('add', () => {
      const img = marker.getElement()?.querySelector('img');
      if (img instanceof HTMLImageElement) {
        img.addEventListener('error', () => {
          console.warn(
            `Failed to load icon from: ${resolvedUrl}. Entity icon: ${iconUrl}`,
          );
        });
      }
    });

    return marker;
  }

  return L.circleMarker(latlng, {
    ...options.defaultStyle,
    pane: options.pane,
  });
}

export function applySelectedPointStyle(
  layer: L.Layer,
  options: {
    defaultStyle: CircleMarkerOptions;
    selectedStyle: CircleMarkerOptions;
    iconUrl?: string | null;
    selectedIconSize?: [number, number];
    defaultIconSize?: [number, number];
  },
) {
  if ('setRadius' in layer) {
    (layer as L.CircleMarker).setStyle(
      options.selectedStyle,
    );
    return;
  }

  if (options.iconUrl && 'setIcon' in layer) {
    const size =
      options.selectedIconSize ?? [40, 40];

    (layer as L.Marker).setIcon(
      L.icon({
        iconUrl: resolveMediaUrl(options.iconUrl),
        iconSize: size,
        iconAnchor: [size[0] / 2, size[1]],
        popupAnchor: [0, -size[1] + 4],
      }),
    );
  }
}

export function applyDefaultPointStyle(
  layer: L.Layer,
  options: {
    defaultStyle: CircleMarkerOptions;
    iconUrl?: string | null;
    defaultIconSize?: [number, number];
  },
) {
  if ('setRadius' in layer) {
    (layer as L.CircleMarker).setStyle(
      options.defaultStyle,
    );
    return;
  }

  if (options.iconUrl && 'setIcon' in layer) {
    const size =
      options.defaultIconSize ?? [32, 32];

    (layer as L.Marker).setIcon(
      L.icon({
        iconUrl: resolveMediaUrl(options.iconUrl),
        iconSize: size,
        iconAnchor: [size[0] / 2, size[1]],
        popupAnchor: [0, -size[1] + 4],
      }),
    );
  }
}
