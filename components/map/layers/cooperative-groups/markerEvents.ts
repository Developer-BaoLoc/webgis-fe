import type { MutableRefObject } from 'react';
import type { Layer } from 'leaflet';

import { buildCooperativeGroupPopupHtml } from './popup';
import {
  toCooperativeGroupProperties,
  toSelectedCooperativeGroup,
} from './utils';
import type { SelectedCooperativeGroup } from './types';

interface MarkerEventHandlers {
  cooperativeGroupLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectCooperativeGroup: (
    cooperativeGroup: SelectedCooperativeGroup,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export function attachCooperativeGroupMarkerEvents(
  feature: GeoJSON.Feature,
  layer: Layer,
  handlers: MarkerEventHandlers,
) {
  const properties = toCooperativeGroupProperties(
    feature.properties as Record<string, unknown>,
  );

  handlers.cooperativeGroupLayersRef.current[
    properties.id
  ] = layer;

  layer.bindPopup(
    buildCooperativeGroupPopupHtml(properties),
  );
  layer.on('click', () => {
    handlers.onSelectCooperativeGroup(
      toSelectedCooperativeGroup(properties),
      layer,
    );
  });

  layer.on('popupclose', () => {
    handlers.onClearSelection(layer);
  });
}
