import type { MutableRefObject } from 'react';
import type { CircleMarker } from 'leaflet';

import { buildEffectiveModelPopupHtml } from './popup';
import {
  toEffectiveModelProperties,
  toSelectedEffectiveModel,
} from './utils';
import type { SelectedEffectiveModel } from './types';

interface MarkerEventHandlers {
  effectiveModelLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectEffectiveModel: (
    effectiveModel: SelectedEffectiveModel,
    layer: CircleMarker,
  ) => void;
  onClearSelection: (
    layer: CircleMarker,
  ) => void;
}

export function attachEffectiveModelMarkerEvents(
  feature: GeoJSON.Feature,
  layer: CircleMarker,
  handlers: MarkerEventHandlers,
) {
  const properties = toEffectiveModelProperties(
    feature.properties as Record<string, unknown>,
  );

  handlers.effectiveModelLayersRef.current[
    properties.id
  ] = layer;

  layer.bindPopup(
    buildEffectiveModelPopupHtml(properties),
  );

  layer.bringToFront();

  layer.on('click', () => {
    handlers.onSelectEffectiveModel(
      toSelectedEffectiveModel(properties),
      layer,
    );
  });

  layer.on('popupclose', () => {
    handlers.onClearSelection(layer);
  });
}
