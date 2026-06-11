import {
  useRef,
  useState,
  useCallback,
} from 'react';
import type {
  CircleMarkerOptions,
  Layer,
} from 'leaflet';

import {
  applyDefaultPointStyle,
  applySelectedPointStyle,
} from '../layers/shared/createPointMarker';

interface SelectableEntity {
  id: number;
  icon?: string | null;
}

export default function usePointSelection<
  T extends SelectableEntity,
>(options: {
  defaultStyle: CircleMarkerOptions;
  selectedStyle: CircleMarkerOptions;
}) {
  const [selectedItem, setSelectedItem] =
    useState<T | null>(null);

  const layersRef = useRef<
    Record<number, Layer>
  >({});

  const selectedLayerRef =
    useRef<Layer | null>(null);

  const selectedIconRef = useRef<
    string | null | undefined
  >(null);

  const resetLayer = useCallback(
    (layer: Layer, iconUrl?: string | null) => {
      applyDefaultPointStyle(layer, {
        defaultStyle: options.defaultStyle,
        iconUrl,
      });
    },
    [options.defaultStyle],
  );

  const onSelect = useCallback(
    (item: T, layer: Layer) => {
      if (
        selectedLayerRef.current &&
        selectedLayerRef.current !== layer
      ) {
        resetLayer(
          selectedLayerRef.current,
          selectedIconRef.current,
        );
        selectedLayerRef.current.closePopup();
      }

      setSelectedItem(item);
      selectedLayerRef.current = layer;
      selectedIconRef.current = item.icon;

      applySelectedPointStyle(layer, {
        defaultStyle: options.defaultStyle,
        selectedStyle: options.selectedStyle,
        iconUrl: item.icon,
      });

      layer.openPopup();
    },
    [
      options.defaultStyle,
      options.selectedStyle,
      resetLayer,
    ],
  );

  const onClearSelection = useCallback(
    (layer: Layer) => {
      if (selectedLayerRef.current !== layer) {
        return;
      }

      resetLayer(layer, selectedIconRef.current);
      selectedLayerRef.current = null;
      selectedIconRef.current = null;
      setSelectedItem(null);
    },
    [resetLayer],
  );

  return {
    selectedItem,
    layersRef,
    onSelect,
    onClearSelection,
  };
}
