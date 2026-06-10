import {
  useCallback,
  type MutableRefObject,
} from 'react';
import { GeoJSON } from 'react-leaflet';
import type { CircleMarker } from 'leaflet';

import { createCooperativeMarker } from './cooperatives/createCooperativeMarker';
import { attachCooperativeMarkerEvents } from './cooperatives/markerEvents';
import type { SelectedCooperative } from './cooperatives/types';

interface Props {
  cooperatives: GeoJSON.FeatureCollection;
  cooperativeLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectCooperative: (
    cooperative: SelectedCooperative,
    layer: CircleMarker,
  ) => void;
  onClearSelection: (
    layer: CircleMarker,
  ) => void;
}

export default function CooperativeLayer({
  cooperatives,
  cooperativeLayersRef,
  onSelectCooperative,
  onClearSelection,
}: Props) {
  const onEachFeature = useCallback(
    (
      feature: GeoJSON.Feature,
      layer: CircleMarker,
    ) => {
      attachCooperativeMarkerEvents(
        feature,
        layer,
        {
          cooperativeLayersRef,
          onSelectCooperative,
          onClearSelection,
        },
      );
    },
    [
      cooperativeLayersRef,
      onSelectCooperative,
      onClearSelection,
    ],
  );

  if (!cooperatives) return null;

  return (
    <GeoJSON
      data={cooperatives}
      pointToLayer={createCooperativeMarker}
      onEachFeature={onEachFeature}
    />
  );
}
