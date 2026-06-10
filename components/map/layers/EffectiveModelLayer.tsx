import {
  useCallback,
  type MutableRefObject,
} from 'react';
import { GeoJSON } from 'react-leaflet';
import type { CircleMarker } from 'leaflet';

import { createEffectiveModelMarker } from './effective-models/createEffectiveModelMarker';
import { attachEffectiveModelMarkerEvents } from './effective-models/markerEvents';
import type { SelectedEffectiveModel } from './effective-models/types';

interface Props {
  effectiveModels: GeoJSON.FeatureCollection;
  effectiveModelLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectEffectiveModel: (
    effectiveModel: SelectedEffectiveModel,
    layer: CircleMarker,
  ) => void;
  onClearSelection: (
    layer: CircleMarker,
  ) => void;
}

export default function EffectiveModelLayer({
  effectiveModels,
  effectiveModelLayersRef,
  onSelectEffectiveModel,
  onClearSelection,
}: Props) {
  const onEachFeature = useCallback(
    (
      feature: GeoJSON.Feature,
      layer: CircleMarker,
    ) => {
      attachEffectiveModelMarkerEvents(
        feature,
        layer,
        {
          effectiveModelLayersRef,
          onSelectEffectiveModel,
          onClearSelection,
        },
      );
    },
    [
      effectiveModelLayersRef,
      onSelectEffectiveModel,
      onClearSelection,
    ],
  );

  if (!effectiveModels) return null;

  return (
    <GeoJSON
      data={effectiveModels}
      pointToLayer={createEffectiveModelMarker}
      onEachFeature={onEachFeature}
    />
  );
}
