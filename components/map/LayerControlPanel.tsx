'use client';

import type { MutableRefObject } from 'react';
import {
  LayersControl,
} from 'react-leaflet';
import type { CircleMarker, Layer } from 'leaflet';

import WardLayer from './layers/WardLayer';
import RoadLayer from './layers/RoadLayer';
import RiverLayer from './layers/RiverLayer';
import CooperativeLayer from './layers/CooperativeLayer';
import IrrigationLayer from './layers/IrrigationLayer';
import EffectiveModelLayer from './layers/EffectiveModelLayer';
import OcopEntityLayer from './layers/OcopEntityLayer';
import ProductionAreaLayer from './layers/ProductionAreaLayer';
import type { SelectedCooperative } from './layers/cooperatives/types';
import type { SelectedIrrigation } from './layers/irrigations/types';
import type { SelectedEffectiveModel } from './layers/effective-models/types';
import type { SelectedOcopEntity } from './layers/ocop-entities/types';
import type { SelectedProductionArea } from './layers/production-areas/types';

interface Props {
  wards: any;
  roads: any;
  rivers: any;
  cooperatives: any;
  irrigations: any;
  effectiveModels: any;
  ocopEntities: any;
  productionAreas: any;

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
  onClearCooperativeSelection: (
    layer: CircleMarker,
  ) => void;

  irrigationLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectIrrigation: (
    irrigation: SelectedIrrigation,
    layer: CircleMarker,
  ) => void;
  onClearIrrigationSelection: (
    layer: CircleMarker,
  ) => void;

  effectiveModelLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectEffectiveModel: (
    effectiveModel: SelectedEffectiveModel,
    layer: CircleMarker,
  ) => void;
  onClearEffectiveModelSelection: (
    layer: CircleMarker,
  ) => void;

  ocopEntityLayersRef: MutableRefObject<
    Record<number, CircleMarker>
  >;
  onSelectOcopEntity: (
    ocopEntity: SelectedOcopEntity,
    layer: CircleMarker,
  ) => void;
  onClearOcopEntitySelection: (
    layer: CircleMarker,
  ) => void;

  productionAreaLayersRef: MutableRefObject<
    Record<number, Layer>
  >;
  selectedProductionAreaId: number | null;
  onSelectProductionArea: (
    productionArea: SelectedProductionArea,
    layer: Layer,
  ) => void;
  onClearProductionAreaSelection: (
    layer: Layer,
  ) => void;
}

export default function LayerControlPanel({
  wards,
  roads,
  rivers,
  cooperatives,
  irrigations,
  effectiveModels,
  ocopEntities,
  productionAreas,
  zoom,
  selectedWardId,
  wardLayersRef,
  cooperativeLayersRef,
  onSelectCooperative,
  onClearCooperativeSelection,
  irrigationLayersRef,
  onSelectIrrigation,
  onClearIrrigationSelection,
  effectiveModelLayersRef,
  onSelectEffectiveModel,
  onClearEffectiveModelSelection,
  ocopEntityLayersRef,
  onSelectOcopEntity,
  onClearOcopEntitySelection,
  productionAreaLayersRef,
  selectedProductionAreaId,
  onSelectProductionArea,
  onClearProductionAreaSelection,
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
              onClearCooperativeSelection
            }
          />
        </LayersControl.Overlay>
      )}

      {irrigations && (
        <LayersControl.Overlay
          checked
          name="Irrigations"
        >
          <IrrigationLayer
            irrigations={irrigations}
            irrigationLayersRef={
              irrigationLayersRef
            }
            onSelectIrrigation={
              onSelectIrrigation
            }
            onClearSelection={
              onClearIrrigationSelection
            }
          />
        </LayersControl.Overlay>
      )}

      {effectiveModels && (
        <LayersControl.Overlay
          checked
          name="Effective Models"
        >
          <EffectiveModelLayer
            effectiveModels={effectiveModels}
            effectiveModelLayersRef={
              effectiveModelLayersRef
            }
            onSelectEffectiveModel={
              onSelectEffectiveModel
            }
            onClearSelection={
              onClearEffectiveModelSelection
            }
          />
        </LayersControl.Overlay>
      )}

      {ocopEntities && (
        <LayersControl.Overlay
          checked
          name="OCOP Entities"
        >
          <OcopEntityLayer
            ocopEntities={ocopEntities}
            ocopEntityLayersRef={
              ocopEntityLayersRef
            }
            onSelectOcopEntity={
              onSelectOcopEntity
            }
            onClearSelection={
              onClearOcopEntitySelection
            }
          />
        </LayersControl.Overlay>
      )}

      {productionAreas && (
        <LayersControl.Overlay
          checked
          name="Production Areas"
        >
          <ProductionAreaLayer
            productionAreas={productionAreas}
            productionAreaLayersRef={
              productionAreaLayersRef
            }
            selectedProductionAreaId={
              selectedProductionAreaId
            }
            onSelectProductionArea={
              onSelectProductionArea
            }
            onClearSelection={
              onClearProductionAreaSelection
            }
          />
        </LayersControl.Overlay>
      )}
    </LayersControl>
  );
}
