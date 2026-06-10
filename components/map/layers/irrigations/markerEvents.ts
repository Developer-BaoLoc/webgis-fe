import type { MutableRefObject } from 'react';
import type { CircleMarker } from 'leaflet';

import { buildIrrigationPopupHtml } from './popup';
import {
  toIrrigationProperties,
  toSelectedIrrigation,
} from './utils';
import type { SelectedIrrigation } from './types';

interface MarkerEventHandlers {
  irrigationLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectIrrigation: (
    irrigation: SelectedIrrigation,
    layer: CircleMarker,
  ) => void;
  onClearSelection: (
    layer: CircleMarker,
  ) => void;
}

export function attachIrrigationMarkerEvents(
  feature: GeoJSON.Feature,
  layer: CircleMarker,
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

  layer.bringToFront();

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
