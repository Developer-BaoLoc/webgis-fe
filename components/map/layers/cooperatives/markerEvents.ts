import type { MutableRefObject } from 'react';
import type { CircleMarker } from 'leaflet';

import { buildCooperativePopupHtml } from './popup';
import {
  toCooperativeProperties,
  toSelectedCooperative,
} from './utils';
import type { SelectedCooperative } from './types';

interface MarkerEventHandlers {
  cooperativeLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectCooperative: (
    cooperative: SelectedCooperative,
    layer: CircleMarker,
  ) => void;
  onClearSelection: (
    layer: CircleMarker,
  ) => void;
}

export function attachCooperativeMarkerEvents(
  feature: GeoJSON.Feature,
  layer: CircleMarker,
  handlers: MarkerEventHandlers,
) {
  const properties = toCooperativeProperties(
    feature.properties as Record<string, unknown>,
  );

  handlers.cooperativeLayersRef.current[
    properties.id
  ] = layer;

  layer.bindPopup(
    buildCooperativePopupHtml(properties),
  );

  layer.bringToFront();

  layer.on('click', () => {
    handlers.onSelectCooperative(
      toSelectedCooperative(properties),
      layer,
    );
  });

  layer.on('popupclose', () => {
    handlers.onClearSelection(layer);
  });

}
