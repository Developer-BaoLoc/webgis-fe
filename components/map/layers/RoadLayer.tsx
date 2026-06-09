import { GeoJSON } from 'react-leaflet';

interface Props {
    roads: any;
    zoom: number;
}

export default function RoadLayer({
    roads,
    zoom,
}: Props) {
    if (!roads) return null;

    const getRoadStyle = (feature: any) => {
        const highway = feature?.properties?.highway;

        let weight = 0.3;
        let opacity = 0.15;

        if (zoom >= 13) {
            weight = 2;
            opacity = 0.9;
        } else if (zoom >= 11) {
            weight = 1;
            opacity = 0.5;
        } else if (zoom >= 9) {
            weight = 0.6;
            opacity = 0.3;
        }

        if (
            highway === 'motorway' ||
            highway === 'trunk'
        ) {
            weight += 2;
        } else if (
            highway === 'primary'
        ) {
            weight += 1;
        }

        return {
            color: '#d32f2f',
            weight,
            opacity,
        };
    };

    return (
        <GeoJSON
            data={roads}
            style={getRoadStyle}
            onEachFeature={(
                feature: any,
                layer: any,
            ) => {
                layer.bindPopup(`
          <b>${feature.properties.name || 'Không có tên'}</b>
        `);
            }}
        />
    );
}