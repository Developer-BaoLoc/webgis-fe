import type { MutableRefObject } from 'react';
import type { CircleMarker } from 'leaflet';

import { buildOcopEntityPopupHtml } from './popup';
import {
  toOcopEntityProperties,
  toSelectedOcopEntity,
} from './utils';
import type { SelectedOcopEntity } from './types';

interface MarkerEventHandlers {
  ocopEntityLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectOcopEntity: (
    ocopEntity: SelectedOcopEntity,
    layer: CircleMarker,
  ) => void;
  onClearSelection: (
    layer: CircleMarker,
  ) => void;
}

export function attachOcopEntityMarkerEvents(
  feature: GeoJSON.Feature,
  layer: CircleMarker,
  handlers: MarkerEventHandlers,
) {
  const properties = toOcopEntityProperties(
    feature.properties as Record<string, unknown>,
  );

  handlers.ocopEntityLayersRef.current[
    properties.id
  ] = layer;

  layer.bindPopup(
    buildOcopEntityPopupHtml(properties),
  );

  layer.bringToFront();

  layer.on('click', () => {
    handlers.onSelectOcopEntity(
      toSelectedOcopEntity(properties),
      layer,
    );
  });

  layer.on('popupclose', () => {
    handlers.onClearSelection(layer);
  });
}
