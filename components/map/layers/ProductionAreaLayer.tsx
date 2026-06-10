import {
  useCallback,
  type MutableRefObject,
} from 'react';
import { GeoJSON } from 'react-leaflet';
import type { Layer } from 'leaflet';

import { attachProductionAreaPolygonEvents } from './production-areas/polygonEvents';
import {
  DEFAULT_POLYGON_STYLE,
  SELECTED_POLYGON_STYLE,
} from './production-areas/polygonStyles';
import type { SelectedProductionArea } from './production-areas/types';

interface Props {
  productionAreas: GeoJSON.FeatureCollection;
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

export default function ProductionAreaLayer({
  productionAreas,
  productionAreaLayersRef,
  selectedProductionAreaId,
  onSelectProductionArea,
  onClearSelection,
}: Props) {
  const style = useCallback(
    (feature: any) => ({
      ...(feature.properties.id ===
      selectedProductionAreaId
        ? SELECTED_POLYGON_STYLE
        : DEFAULT_POLYGON_STYLE),
    }),
    [selectedProductionAreaId],
  );

  const onEachFeature = useCallback(
    (
      feature: GeoJSON.Feature,
      layer: Layer,
    ) => {
      attachProductionAreaPolygonEvents(
        feature,
        layer,
        {
          productionAreaLayersRef,
          selectedProductionAreaId,
          onSelectProductionArea,
          onClearSelection,
        },
      );
    },
    [
      productionAreaLayersRef,
      selectedProductionAreaId,
      onSelectProductionArea,
      onClearSelection,
    ],
  );

  if (!productionAreas) return null;

  return (
    <GeoJSON
      data={productionAreas}
      pane="production-areas"
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
