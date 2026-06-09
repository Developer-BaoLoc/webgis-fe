# Map Module

Interactive Leaflet map with ward, road, and river layers, search, and geolocation.

## Purpose

Render GIS data from the backend, let users search wards, fly to their location, and toggle layer visibility.

## Entry points

| File | Role |
|------|------|
| `../../Map.tsx` | Dynamic import wrapper (SSR off) |
| `../../LeafletMap.tsx` | Main map composition — wires hooks, controls, and layers |

## Directory structure

```
map/
├── LayerControlPanel.tsx   # Leaflet layer toggle UI
├── SearchWardBox.tsx       # Ward search input + suggestions
├── controls/
│   ├── MapRefSetter.tsx    # Captures Leaflet map instance in a ref
│   ├── ZoomTracker.tsx     # Reports zoom level changes
│   └── FlyToMyLocation.tsx # Flies map to geolocation coords
├── hooks/
│   ├── useMapData.ts       # Fetches wards, roads, rivers
│   ├── useCurrentLocation.ts  # Browser geolocation + ward lookup
│   ├── useWardSearch.ts    # Client-side ward name filter
│   └── useZoomToWard.ts    # Fit bounds + highlight on ward select
├── layers/
│   ├── WardLayer.tsx       # Ward polygons (green/orange highlight)
│   ├── RoadLayer.tsx       # Roads (zoom-dependent styling)
│   └── RiverLayer.tsx      # Rivers
├── markers/
│   └── CurrentLocationMarker.tsx  # User position + ward name popup
└── events/
    └── MapEvents.tsx       # (if used) map event handlers
```

## Data flow

```
useMapData
  ├── GET /wards  (on mount)
  ├── GET /roads  (lazy, after wards load)
  └── GET /rivers (lazy, after wards load)

useCurrentLocation
  ├── navigator.geolocation.getCurrentPosition
  └── GET /wards/current?lat=&lng=

useWardSearch
  └── filters wards.features client-side by name

useZoomToWard
  └── fitBounds on ward layer + temporary highlight (15s)
```

## `LeafletMap` composition

Default center: `[10.045, 105.746]`, zoom `11`. Base tiles: OpenStreetMap.

Overlays (via `LayerControlPanel`):

| Layer | Default | Notes |
|-------|---------|-------|
| Wards | on | Popups on click; hover highlight |
| Roads | off | Style scales with zoom; motorways/trunks thicker |
| Rivers | off | Similar zoom-based rendering |

## Hooks reference

### `useMapData`

Returns `{ wards, roads, rivers, loadRoads, loadRivers }`. Roads and rivers are fetched once, lazily.

### `useCurrentLocation`

Returns `{ currentLocation: [lat, lng] | null, currentWard: string }`. Ward name defaults to `"Không xác định"` on failure.

### `useWardSearch(wards)`

Returns `{ searchText, setSearchText, suggestions, setSuggestions }`. Max 10 suggestions, case-insensitive substring match.

### `useZoomToWard(mapRef, wardLayersRef)`

Returns `{ selectedWardId, zoomToWard }`. `wardLayersRef` is populated by `WardLayer.onEachFeature` keyed by ward name.

## Layer styling notes

**Wards**: green fill (`#4caf50`), orange highlight when selected (`#ff9800` / `#ffc107`).

**Roads**: red (`#d32f2f`); weight and opacity increase at zoom ≥ 9, 11, 13; motorways/trunks get extra weight.

## Backend endpoints

| Endpoint | Hook / component |
|----------|-----------------|
| `GET /wards` | `useMapData` |
| `GET /roads` | `useMapData.loadRoads` |
| `GET /rivers` | `useMapData.loadRivers` |
| `GET /wards/current` | `useCurrentLocation` |

API URLs defined in [lib/api.ts](../../lib/api.ts).

## Related backend docs

- [wards](../../../webgis-api/src/modules/wards/README.md)
- [roads](../../../webgis-api/src/modules/roads/README.md)
- [rivers](../../../webgis-api/src/modules/rivers/README.md)
