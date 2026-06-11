import type { MutableRefObject } from 'react';
import type { Layer } from 'leaflet';

import { buildCooperativePopupHtml } from './popup';
import {
  toCooperativeProperties,
  toSelectedCooperative,
} from './utils';
import type { SelectedCooperative } from './types';

interface MarkerEventHandlers {
  cooperativeLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectCooperative: (
    cooperative: SelectedCooperative,
    layer: Layer,
  ) => void;
  onClearSelection: (
    layer: Layer,
  ) => void;
}

export function attachCooperativeMarkerEvents(
  feature: GeoJSON.Feature,
  layer: Layer,
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
