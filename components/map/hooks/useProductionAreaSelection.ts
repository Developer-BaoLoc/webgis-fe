import {
  useRef,
  useState,
  useCallback,
} from 'react';
import type { Layer } from 'leaflet';

import type { SelectedProductionArea } from '../layers/production-areas/types';
import {
  DEFAULT_POLYGON_STYLE,
  SELECTED_POLYGON_STYLE,
} from '../layers/production-areas/polygonStyles';

export default function useProductionAreaSelection() {
  const [
    selectedProductionArea,
    setSelectedProductionArea,
  ] = useState<SelectedProductionArea | null>(
    null,
  );

  const productionAreaLayersRef = useRef<
    Record<number, Layer>
  >({});

  const selectedLayerRef =
    useRef<Layer | null>(null);

  const onSelectProductionArea = useCallback(
    (
      productionArea: SelectedProductionArea,
      layer: Layer,
    ) => {
      if (
        selectedLayerRef.current &&
        selectedLayerRef.current !== layer
      ) {
        (selectedLayerRef.current as any).setStyle(
          DEFAULT_POLYGON_STYLE,
        );
        selectedLayerRef.current.closePopup();
      }

      setSelectedProductionArea(productionArea);
      selectedLayerRef.current = layer;
      (layer as any).setStyle(
        SELECTED_POLYGON_STYLE,
      );
      layer.openPopup();
    },
    [],
  );

  const onClearSelection = useCallback(
    (layer: Layer) => {
      if (selectedLayerRef.current !== layer) {
        return;
      }

      (layer as any).setStyle(
        DEFAULT_POLYGON_STYLE,
      );
      selectedLayerRef.current = null;
      setSelectedProductionArea(null);
    },
    [],
  );

  return {
    selectedProductionArea,
    selectedProductionAreaId:
      selectedProductionArea?.id ?? null,
    productionAreaLayersRef,
    onSelectProductionArea,
    onClearSelection,
  };
}
