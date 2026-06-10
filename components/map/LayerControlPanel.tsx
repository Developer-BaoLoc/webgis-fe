'use client';

import type { MutableRefObject } from 'react';
import {
  LayersControl,
} from 'react-leaflet';

import WardLayer from './layers/WardLayer';
import RoadLayer from './layers/RoadLayer';
import RiverLayer from './layers/RiverLayer';
import CooperativeLayer from './layers/CooperativeLayer';
import type { SelectedCooperative } from './layers/cooperatives/types';
import type { CircleMarker } from 'leaflet';

interface Props {
  wards: any;
  roads: any;
  rivers: any;
  cooperatives: any;

  zoom: number;

  selectedWardId:
    number | null;

  wardLayersRef: any;

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

export default function LayerControlPanel({
  wards,
  roads,
  rivers,
  cooperatives,
  zoom,
  selectedWardId,
  wardLayersRef,
  cooperativeLayersRef,
  onSelectCooperative,
  onClearSelection,
}: Props) {

  return (
    <LayersControl position="topright">
      <LayersControl.Overlay
        checked
        name="Wards"
      >
        <WardLayer
          wards={wards}
          selectedWardId={
            selectedWardId
          }
          wardLayersRef={
            wardLayersRef
          }
        />
      </LayersControl.Overlay>

      {roads && (
        <LayersControl.Overlay
          name="Roads"
        >
          <RoadLayer
            roads={roads}
            zoom={zoom}
          />
        </LayersControl.Overlay>
      )}

      {rivers && (
        <LayersControl.Overlay
          name="Rivers"
        >
          <RiverLayer
            rivers={rivers}
            zoom={zoom}
          />
        </LayersControl.Overlay>
      )}

      {cooperatives && (
        <LayersControl.Overlay
          checked
          name="Cooperatives"
        >
          <CooperativeLayer
            cooperatives={cooperatives}
            cooperativeLayersRef={
              cooperativeLayersRef
            }
            onSelectCooperative={
              onSelectCooperative
            }
            onClearSelection={
              onClearSelection
            }
          />
        </LayersControl.Overlay>
      )}
    </LayersControl>
  );
}