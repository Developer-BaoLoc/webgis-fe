import { createPointMarker } from '../shared/createPointMarker';
import { DEFAULT_MARKER_STYLE } from './markerStyles';

export function createEffectiveModelMarker(
  feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
) {
  return createPointMarker(feature, latlng, {
    pane: 'effective-models',
    defaultStyle: DEFAULT_MARKER_STYLE,
  });
}
