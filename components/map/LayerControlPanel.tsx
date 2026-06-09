'use client';

import {
  LayersControl,
} from 'react-leaflet';

import WardLayer from './layers/WardLayer';
import RoadLayer from './layers/RoadLayer';
import RiverLayer from './layers/RiverLayer';

interface Props {
  wards: any;
  roads: any;
  rivers: any;

  zoom: number;

  selectedWardId:
    number | null;

  wardLayersRef: any;
}

export default function LayerControlPanel({
  wards,
  roads,
  rivers,
  zoom,
  selectedWardId,
  wardLayersRef,
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
    </LayersControl>
  );
}