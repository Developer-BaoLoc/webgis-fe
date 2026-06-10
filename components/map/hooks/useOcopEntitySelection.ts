import {
  useRef,
  useState,
  useCallback,
} from 'react';
import type { CircleMarker } from 'leaflet';

import type { SelectedOcopEntity } from '../layers/ocop-entities/types';
import {
  applyDefaultMarkerStyle,
  applySelectedMarkerStyle,
} from '../layers/ocop-entities/markerStyles';

export default function useOcopEntitySelection() {
  const [
    selectedOcopEntity,
    setSelectedOcopEntity,
  ] = useState<SelectedOcopEntity | null>(
    null,
  );

  const ocopEntityLayersRef = useRef<
    Record<number, CircleMarker>
  >({});

  const selectedLayerRef =
    useRef<CircleMarker | null>(null);

  const onSelectOcopEntity = useCallback(
    (
      ocopEntity: SelectedOcopEntity,
      layer: CircleMarker,
    ) => {
      if (
        selectedLayerRef.current &&
        selectedLayerRef.current !== layer
      ) {
        applyDefaultMarkerStyle(
          selectedLayerRef.current,
        );
        selectedLayerRef.current.closePopup();
      }

      setSelectedOcopEntity(ocopEntity);
      selectedLayerRef.current = layer;
      applySelectedMarkerStyle(layer);
      layer.openPopup();
    },
    [],
  );

  const onClearSelection = useCallback(
    (layer: CircleMarker) => {
      if (selectedLayerRef.current !== layer) {
        return;
      }

      applyDefaultMarkerStyle(layer);
      selectedLayerRef.current = null;
      setSelectedOcopEntity(null);
    },
    [],
  );

  return {
    selectedOcopEntity,
    ocopEntityLayersRef,
    onSelectOcopEntity,
    onClearSelection,
  };
}
