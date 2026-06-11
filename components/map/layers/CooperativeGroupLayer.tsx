import {
  useCallback,
  type MutableRefObject,
} from 'react';
import { GeoJSON } from 'react-leaflet';
import type { Layer } from 'leaflet';

import { createCooperativeGroupMarker } from './cooperative-groups/createCooperativeGroupMarker';
import { attachCooperativeGroupMarkerEvents } from './cooperative-groups/markerEvents';
import type { SelectedCooperativeGroup } from './cooperative-groups/types';

interface Props {
  cooperativeGroups: GeoJSON.FeatureCollection;
  cooperativeGroupLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectCooperativeGroup: (
    cooperativeGroup: SelectedCooperativeGroup,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export default function CooperativeGroupLayer({
  cooperativeGroups,
  cooperativeGroupLayersRef,
  onSelectCooperativeGroup,
  onClearSelection,
}: Props) {
  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: Layer) => {
      attachCooperativeGroupMarkerEvents(
        feature,
        layer,
        {
          cooperativeGroupLayersRef,
          onSelectCooperativeGroup,
          onClearSelection,
        },
      );
    },
    [
      cooperativeGroupLayersRef,
      onSelectCooperativeGroup,
      onClearSelection,
    ],
  );

  if (!cooperativeGroups) return null;

  return (
    <GeoJSON
      data={cooperativeGroups}
      pointToLayer={createCooperativeGroupMarker}
      onEachFeature={onEachFeature}
    />
  );
}
