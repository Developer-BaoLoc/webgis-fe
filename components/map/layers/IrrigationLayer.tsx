import {
  useCallback,
  type MutableRefObject,
} from 'react';
import { GeoJSON } from 'react-leaflet';
import type { Layer } from 'leaflet';

import { createIrrigationMarker } from './irrigations/createIrrigationMarker';
import { attachIrrigationMarkerEvents } from './irrigations/markerEvents';
import type { SelectedIrrigation } from './irrigations/types';

interface Props {
  irrigations: GeoJSON.FeatureCollection;
  irrigationLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectIrrigation: (
    irrigation: SelectedIrrigation,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export default function IrrigationLayer({
  irrigations,
  irrigationLayersRef,
  onSelectIrrigation,
  onClearSelection,
}: Props) {
  const onEachFeature = useCallback(
    (
      feature: GeoJSON.Feature,
      layer: Layer,
    ) => {
      attachIrrigationMarkerEvents(
        feature,
        layer,
        {
          irrigationLayersRef,
          onSelectIrrigation,
          onClearSelection,
        },
      );
    },
    [
      irrigationLayersRef,
      onSelectIrrigation,
      onClearSelection,
    ],
  );

  if (!irrigations) return null;

  return (
    <GeoJSON
      data={irrigations}
      pointToLayer={createIrrigationMarker}
      onEachFeature={onEachFeature}
    />
  );
}
