import { createPointMarker } from '../shared/createPointMarker';
import { DEFAULT_MARKER_STYLE } from './markerStyles';

export function createIrrigationMarker(
  feature: GeoJSON.Feature,
  latlng: L.LatLngExpression,
) {
  return createPointMarker(feature, latlng, {
    pane: 'irrigations',
    defaultStyle: DEFAULT_MARKER_STYLE,
  });
}
