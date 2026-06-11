import { createPointMarker } from '../shared/createPointMarker';
import { DEFAULT_MARKER_STYLE } from './markerStyles';

export function createCooperativeMarker(
  feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
) {
  return createPointMarker(feature, latlng, {
    pane: 'cooperatives',
    defaultStyle: DEFAULT_MARKER_STYLE,
  });
}
