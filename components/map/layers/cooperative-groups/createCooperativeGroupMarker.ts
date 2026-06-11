import { createPointMarker } from '../shared/createPointMarker';
import { DEFAULT_MARKER_STYLE } from './markerStyles';

export function createCooperativeGroupMarker(
  feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
) {
  return createPointMarker(feature, latlng, {
    pane: 'cooperative-groups',
    defaultStyle: DEFAULT_MARKER_STYLE,
  });
}
