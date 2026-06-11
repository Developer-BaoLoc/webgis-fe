import {
  useCallback,
  type MutableRefObject,
} from 'react';
import { GeoJSON } from 'react-leaflet';
import type { Layer } from 'leaflet';

import { createOcopEntityMarker } from './ocop-entities/createOcopEntityMarker';
import { attachOcopEntityMarkerEvents } from './ocop-entities/markerEvents';
import type { SelectedOcopEntity } from './ocop-entities/types';

interface Props {
  ocopEntities: GeoJSON.FeatureCollection;
  ocopEntityLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  onSelectOcopEntity: (
    ocopEntity: SelectedOcopEntity,
    layer: Layer,
  ) => void;
  onClearSelection: (layer: Layer) => void;
}

export default function OcopEntityLayer({
  ocopEntities,
  ocopEntityLayersRef,
  onSelectOcopEntity,
  onClearSelection,
}: Props) {
  const onEachFeature = useCallback(
    (
      feature: GeoJSON.Feature,
      layer: Layer,
    ) => {
      attachOcopEntityMarkerEvents(
        feature,
        layer,
        {
          ocopEntityLayersRef,
          onSelectOcopEntity,
          onClearSelection,
        },
      );
    },
    [
      ocopEntityLayersRef,
      onSelectOcopEntity,
      onClearSelection,
    ],
  );

  if (!ocopEntities) return null;

  return (
    <GeoJSON
      data={ocopEntities}
      pointToLayer={createOcopEntityMarker}
      onEachFeature={onEachFeature}
    />
  );
}
