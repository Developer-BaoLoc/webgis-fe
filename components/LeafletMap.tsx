"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import L from "leaflet";

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

import CurrentLocationMarker from "./map/markers/CurrentLocationMarker";
import LayerControlPanel from "./map/LayerControlPanel";

import { MapContainer, TileLayer, Pane } from "react-leaflet";

export default function LeafletMap() {
  const { user } = useAuth();

  const mapRef = useRef<any>(null);
  const wardLayersRef = useRef<Record<string, any>>({});

  const [zoom, setZoom] = useState(11);

  const { wards, roads, rivers, cooperatives, loadRoads, loadRivers } =
    useMapData();

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
    selectedCooperative,
    cooperativeLayersRef,
    onSelectCooperative,
    onClearSelection,
  } = useCooperativeSelection();

  useEffect(() => {
    if (!wards) return;
    loadRoads();
    loadRivers();
  }, [wards, loadRoads, loadRivers]);

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

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Pane
          name="cooperatives"
          style={{
            zIndex: 650,
          }}
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
          zoom={zoom}
          selectedWardId={selectedWardId}
          wardLayersRef={wardLayersRef}
          cooperativeLayersRef={cooperativeLayersRef}
          onSelectCooperative={onSelectCooperative}
          onClearSelection={onClearSelection}
        />
      </MapContainer>
    </>
  );
}
