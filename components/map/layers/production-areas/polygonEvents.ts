import type { MutableRefObject } from 'react';
import type { Layer } from 'leaflet';

import { buildProductionAreaPopupHtml } from './popup';
import {
  DEFAULT_POLYGON_STYLE,
  HOVER_POLYGON_STYLE,
} from './polygonStyles';
import {
  toProductionAreaProperties,
  toSelectedProductionArea,
} from './utils';
import type { SelectedProductionArea } from './types';

interface PolygonEventHandlers {
  productionAreaLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  selectedProductionAreaId: number | null;
  onSelectProductionArea: (
    productionArea: SelectedProductionArea,
    layer: Layer,
  ) => void;
  onClearSelection: (
    layer: Layer,
  ) => void;
}

export function attachProductionAreaPolygonEvents(
  feature: GeoJSON.Feature,
  layer: Layer,
  handlers: PolygonEventHandlers,
) {
  const properties = toProductionAreaProperties(
    feature.properties as Record<string, unknown>,
  );

  handlers.productionAreaLayersRef.current[
    properties.id
  ] = layer;

  layer.bindPopup(
    buildProductionAreaPopupHtml(properties),
  );

  layer.on('click', () => {
    handlers.onSelectProductionArea(
      toSelectedProductionArea(properties),
      layer,
    );
  });

  layer.on('popupclose', () => {
    handlers.onClearSelection(layer);
  });

  layer.on({
    mouseover: () => {
      console.log('hover', properties.id);
      if (properties.id === handlers.selectedProductionAreaId)
        return;
  
      (layer as L.Path).setStyle(
        HOVER_POLYGON_STYLE,
      );
    },
  
    mouseout: () => {
      if (properties.id === handlers.selectedProductionAreaId)
        return;
  
      (layer as L.Path).setStyle(
        DEFAULT_POLYGON_STYLE,
      );
    },
  });
}
