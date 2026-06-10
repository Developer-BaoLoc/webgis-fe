import {
  useRef,
  useState,
  useCallback,
} from 'react';
import type { CircleMarker } from 'leaflet';

import type { SelectedCooperative } from '../layers/cooperatives/types';
import {
  applyDefaultMarkerStyle,
  applySelectedMarkerStyle,
} from '../layers/cooperatives/markerStyles';

export default function useCooperativeSelection() {
  const [
    selectedCooperative,
    setSelectedCooperative,
  ] = useState<SelectedCooperative | null>(
    null,
  );

  const cooperativeLayersRef = useRef<
    Record<number, CircleMarker>
  >({});

  const selectedLayerRef =
    useRef<CircleMarker | null>(null);

  const onSelectCooperative = useCallback(
    (
      cooperative: SelectedCooperative,
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

      setSelectedCooperative(cooperative);
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
      setSelectedCooperative(null);
    },
    [],
  );

  return {
    selectedCooperative,
    cooperativeLayersRef,
    onSelectCooperative,
    onClearSelection,
  };
}
