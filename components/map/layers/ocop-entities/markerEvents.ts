import type { MutableRefObject } from 'react';
import type { Layer } from 'leaflet';

import { buildOcopEntityPopupHtml } from './popup';
import {
  toOcopEntityProperties,
  toSelectedOcopEntity,
} from './utils';
import type { SelectedOcopEntity } from './types';

interface MarkerEventHandlers {
  ocopEntityLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectOcopEntity: (
    ocopEntity: SelectedOcopEntity,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export function attachOcopEntityMarkerEvents(
  feature: GeoJSON.Feature,
  layer: Layer,
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
