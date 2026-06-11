import type { CircleMarker } from 'leaflet';

export const DEFAULT_MARKER_STYLE = {
  radius: 6,
  color: '#0891b2',
  fillColor: '#0891b2',
  fillOpacity: 0.9,
  weight: 2,
} as const;

export const SELECTED_MARKER_STYLE = {
  radius: 9,
  color: '#0e7490',
  fillColor: '#0e7490',
  fillOpacity: 0.9,
  weight: 4,
} as const;

export function applyDefaultMarkerStyle(
  layer: CircleMarker,
) {
  layer.setStyle(DEFAULT_MARKER_STYLE);
}

export function applySelectedMarkerStyle(
  layer: CircleMarker,
) {
  layer.setStyle(SELECTED_MARKER_STYLE);
}
