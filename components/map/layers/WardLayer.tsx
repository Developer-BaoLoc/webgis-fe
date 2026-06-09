import { GeoJSON } from 'react-leaflet';

interface Props {
  wards: any;
  selectedWardId: number | null;
  wardLayersRef: any;
}

export default function WardLayer({
  wards,
  selectedWardId,
  wardLayersRef,
}: Props) {
  if (!wards) return null;

  return (
    <GeoJSON
      data={wards}
      style={(feature: any) => ({
        color:
          feature.properties.osm_id === selectedWardId
            ? '#ff9800'
            : '#2e7d32',

        weight:
          feature.properties.osm_id === selectedWardId
            ? 5
            : 2,

        fillColor:
          feature.properties.osm_id === selectedWardId
            ? '#ffc107'
            : '#4caf50',

        fillOpacity:
          feature.properties.osm_id === selectedWardId
            ? 0.5
            : 0.08,
      })}
      onEachFeature={(feature: any, layer: any) => {
        const wardName =
          feature.properties.name;

        wardLayersRef.current[
          wardName
        ] = layer;

        layer.bindPopup(`
          <b>${wardName}</b>
        `);

        layer.on({
          mouseover: () => {
            layer.setStyle({
              fillOpacity: 0.25,
              weight: 3,
            });
          },

          mouseout: () => {
            if (
              feature.properties.osm_id !==
              selectedWardId
            ) {
              layer.setStyle({
                fillOpacity: 0.08,
                weight: 2,
              });
            }
          },
        });
      }}
    />
  );
}