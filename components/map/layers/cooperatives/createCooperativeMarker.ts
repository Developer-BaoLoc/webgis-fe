import L from 'leaflet';
import { DEFAULT_MARKER_STYLE } from './markerStyles';

export function createCooperativeMarker(
  _feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
) {
  return L.circleMarker(
    latlng,
    {
      ...DEFAULT_MARKER_STYLE,
      pane: 'cooperatives',
    },
  );
}