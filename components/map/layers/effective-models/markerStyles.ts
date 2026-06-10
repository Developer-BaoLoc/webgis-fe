import type { CircleMarker } from 'leaflet';

export const DEFAULT_MARKER_STYLE = {
  radius: 6,
  color: '#f97316',
  fillColor: '#f97316',
  fillOpacity: 0.9,
  weight: 2,
} as const;

export const SELECTED_MARKER_STYLE = {
  radius: 9,
  color: '#ea580c',
  fillColor: '#ea580c',
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
