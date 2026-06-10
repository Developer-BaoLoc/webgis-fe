import {
  useRef,
  useState,
  useCallback,
} from 'react';
import type { CircleMarker } from 'leaflet';

import type { SelectedEffectiveModel } from '../layers/effective-models/types';
import {
  applyDefaultMarkerStyle,
  applySelectedMarkerStyle,
} from '../layers/effective-models/markerStyles';

export default function useEffectiveModelSelection() {
  const [
    selectedEffectiveModel,
    setSelectedEffectiveModel,
  ] = useState<SelectedEffectiveModel | null>(
    null,
  );

  const effectiveModelLayersRef = useRef<
    Record<number, CircleMarker>
  >({});

  const selectedLayerRef =
    useRef<CircleMarker | null>(null);

  const onSelectEffectiveModel = useCallback(
    (
      effectiveModel: SelectedEffectiveModel,
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

      setSelectedEffectiveModel(effectiveModel);
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
      setSelectedEffectiveModel(null);
    },
    [],
  );

  return {
    selectedEffectiveModel,
    effectiveModelLayersRef,
    onSelectEffectiveModel,
    onClearSelection,
  };
}
