"use client";

import { useEffect, useRef, useState } from "react";
import UserPanel from "./auth/UserPanel";
import SearchWardBox from "./map/SearchWardBox";

import MapRefSetter from "./map/controls/MapRefSetter";
import ZoomTracker from "./map/controls/ZoomTracker";
import FlyToMyLocation from "./map/controls/FlyToMyLocation";

import useMapData from "./map/hooks/useMapData";
import useCurrentLocation from "./map/hooks/useCurrentLocation";
import useWardSearch from "./map/hooks/useWardSearch";
import useZoomToWard from "./map/hooks/useZoomToWard";
import useCooperativeSelection from "./map/hooks/useCooperativeSelection";
import useCooperativeGroupSelection from "./map/hooks/useCooperativeGroupSelection";
import useIrrigationSelection from "./map/hooks/useIrrigationSelection";
import useEffectiveModelSelection from "./map/hooks/useEffectiveModelSelection";
import useOcopEntitySelection from "./map/hooks/useOcopEntitySelection";
import useProductionAreaSelection from "./map/hooks/useProductionAreaSelection";

import CurrentLocationMarker from "./map/markers/CurrentLocationMarker";
import LayerControlPanel from "./map/LayerControlPanel";

import { MapContainer, TileLayer, Pane } from "react-leaflet";

const LONG_BINH_WARD_NAME = "Long Bình";

export default function LeafletMap() {
  const mapRef = useRef<any>(null);
  const wardLayersRef = useRef<Record<string, any>>({});

  const [zoom, setZoom] = useState(11);
  const [autoZoomedToLongBinh, setAutoZoomedToLongBinh] = useState(false);

  const {
    wards,
    roads,
    rivers,
    cooperatives,
    cooperativeGroups,
    irrigations,
    effectiveModels,
    ocopEntities,
    productionAreas,
    loadRoads,
    loadRivers,
  } = useMapData();

  const { currentLocation, currentWard } = useCurrentLocation();

  const {
    searchText,
    setSearchText,
    suggestions,
    setSuggestions,
    clearSearch,
  } = useWardSearch(wards);

  const { selectedWardId, zoomToWard } = useZoomToWard(mapRef, wardLayersRef);

  const {
    cooperativeLayersRef,
    onSelectCooperative,
    onClearSelection: onClearCooperativeSelection,
  } = useCooperativeSelection();

  const {
    cooperativeGroupLayersRef,
    onSelectCooperativeGroup,
    onClearSelection: onClearCooperativeGroupSelection,
  } = useCooperativeGroupSelection();

  const {
    selectedIrrigation,
    irrigationLayersRef,
    onSelectIrrigation,
    onClearSelection: onClearIrrigationSelection,
  } = useIrrigationSelection();

  const {
    selectedEffectiveModel,
    effectiveModelLayersRef,
    onSelectEffectiveModel,
    onClearSelection: onClearEffectiveModelSelection,
  } = useEffectiveModelSelection();

  const {
    selectedOcopEntity,
    ocopEntityLayersRef,
    onSelectOcopEntity,
    onClearSelection: onClearOcopEntitySelection,
  } = useOcopEntitySelection();

  const {
    selectedProductionArea,
    selectedProductionAreaId,
    productionAreaLayersRef,
    onSelectProductionArea,
    onClearSelection: onClearProductionAreaSelection,
  } = useProductionAreaSelection();

  useEffect(() => {
    if (!wards) return;
    loadRoads();
    loadRivers();
  }, [wards, loadRoads, loadRivers]);

  // Auto-zoom to Long Bình on mount
  useEffect(() => {
    if (wards && !autoZoomedToLongBinh && wardLayersRef.current[LONG_BINH_WARD_NAME]) {
      const longBinhFeature = wards.features.find(
        (f: any) => f.properties.name === LONG_BINH_WARD_NAME
      );
      if (longBinhFeature) {
        zoomToWard(longBinhFeature, () => { });
        setAutoZoomedToLongBinh(true);
      }
    }
  }, [wards, autoZoomedToLongBinh, zoomToWard]);

  return (
    <>
      <UserPanel />

      <SearchWardBox
        searchText={searchText}
        setSearchText={setSearchText}
        suggestions={suggestions}
        onSelect={(feature) => zoomToWard(feature, clearSearch)}
      />

      <MapContainer
        center={[10.045, 105.746]}
        zoom={11}
        style={{ width: "100vw", height: "100vh" }}
      >
        <MapRefSetter mapRef={mapRef} />

        <FlyToMyLocation currentLocation={currentLocation} />

        <ZoomTracker onZoomChange={setZoom} />

        <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
/>

        <Pane
          name="cooperatives"
          style={{ zIndex: 650 }}
        />
        <Pane
          name="cooperative-groups"
          style={{ zIndex: 649 }}
        />
        <Pane
          name="irrigations"
          style={{ zIndex: 651 }}
        />
        <Pane
          name="effective-models"
          style={{ zIndex: 652 }}
        />
        <Pane
          name="ocop-entities"
          style={{ zIndex: 653 }}
        />

        <Pane
          name="wards"
          style={{ zIndex: 300 }}
        />

        <Pane
          name="production-areas"
          style={{ zIndex: 500 }}
        />

        {currentLocation && (
          <CurrentLocationMarker
            currentLocation={currentLocation}
            currentWard={currentWard}
          />
        )}

        <LayerControlPanel
          wards={wards}
          roads={roads}
          rivers={rivers}
          cooperatives={cooperatives}
          cooperativeGroups={cooperativeGroups}
          irrigations={irrigations}
          effectiveModels={effectiveModels}
          ocopEntities={ocopEntities}
          productionAreas={productionAreas}
          zoom={zoom}
          selectedWardId={selectedWardId}
          wardLayersRef={wardLayersRef}
          cooperativeLayersRef={cooperativeLayersRef}
          onSelectCooperative={onSelectCooperative}
          onClearCooperativeSelection={onClearCooperativeSelection}
          cooperativeGroupLayersRef={cooperativeGroupLayersRef}
          onSelectCooperativeGroup={onSelectCooperativeGroup}
          onClearCooperativeGroupSelection={onClearCooperativeGroupSelection}
          irrigationLayersRef={irrigationLayersRef}
          onSelectIrrigation={onSelectIrrigation}
          onClearIrrigationSelection={onClearIrrigationSelection}
          effectiveModelLayersRef={effectiveModelLayersRef}
          onSelectEffectiveModel={onSelectEffectiveModel}
          onClearEffectiveModelSelection={onClearEffectiveModelSelection}
          ocopEntityLayersRef={ocopEntityLayersRef}
          onSelectOcopEntity={onSelectOcopEntity}
          onClearOcopEntitySelection={onClearOcopEntitySelection}
          productionAreaLayersRef={productionAreaLayersRef}
          selectedProductionAreaId={selectedProductionAreaId}
          onSelectProductionArea={onSelectProductionArea}
          onClearProductionAreaSelection={onClearProductionAreaSelection}
        />
      </MapContainer>
    </>
  );
}
