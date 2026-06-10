import {
  useRef,
  useState,
  useCallback,
} from 'react';
import type { CircleMarker } from 'leaflet';

import type { SelectedIrrigation } from '../layers/irrigations/types';
import {
  applyDefaultMarkerStyle,
  applySelectedMarkerStyle,
} from '../layers/irrigations/markerStyles';

export default function useIrrigationSelection() {
  const [
    selectedIrrigation,
    setSelectedIrrigation,
  ] = useState<SelectedIrrigation | null>(
    null,
  );

  const irrigationLayersRef = useRef<
    Record<number, CircleMarker>
  >({});

  const selectedLayerRef =
    useRef<CircleMarker | null>(null);

  const onSelectIrrigation = useCallback(
    (
      irrigation: SelectedIrrigation,
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

      setSelectedIrrigation(irrigation);
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
      setSelectedIrrigation(null);
    },
    [],
  );

  return {
    selectedIrrigation,
    irrigationLayersRef,
    onSelectIrrigation,
    onClearSelection,
  };
}
