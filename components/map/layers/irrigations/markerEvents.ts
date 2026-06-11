import type { MutableRefObject } from 'react';
import type { Layer } from 'leaflet';

import { buildIrrigationPopupHtml } from './popup';
import {
  toIrrigationProperties,
  toSelectedIrrigation,
} from './utils';
import type { SelectedIrrigation } from './types';

interface MarkerEventHandlers {
  irrigationLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectIrrigation: (
    irrigation: SelectedIrrigation,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export function attachIrrigationMarkerEvents(
  feature: GeoJSON.Feature,
  layer: Layer,
  handlers: MarkerEventHandlers,
) {
  const properties = toIrrigationProperties(
    feature.properties as Record<string, unknown>,
  );

  handlers.irrigationLayersRef.current[
    properties.id
  ] = layer;

  layer.bindPopup(
    buildIrrigationPopupHtml(properties),
  );
  layer.on('click', () => {
    handlers.onSelectIrrigation(
      toSelectedIrrigation(properties),
      layer,
    );
  });

  layer.on('popupclose', () => {
    handlers.onClearSelection(layer);
  });
}
