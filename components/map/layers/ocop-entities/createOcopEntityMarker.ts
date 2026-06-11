import { createPointMarker } from '../shared/createPointMarker';
import { DEFAULT_MARKER_STYLE } from './markerStyles';

export function createOcopEntityMarker(
  feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
) {
  return createPointMarker(feature, latlng, {
    pane: 'ocop-entities',
    defaultStyle: DEFAULT_MARKER_STYLE,
  });
}
