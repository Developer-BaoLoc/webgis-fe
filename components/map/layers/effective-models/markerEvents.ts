import type { MutableRefObject } from 'react';
import type { Layer } from 'leaflet';

import { buildEffectiveModelPopupHtml } from './popup';
import {
  toEffectiveModelProperties,
  toSelectedEffectiveModel,
} from './utils';
import type { SelectedEffectiveModel } from './types';

interface MarkerEventHandlers {
  effectiveModelLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectEffectiveModel: (
    effectiveModel: SelectedEffectiveModel,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export function attachEffectiveModelMarkerEvents(
  feature: GeoJSON.Feature,
  layer: Layer,
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
