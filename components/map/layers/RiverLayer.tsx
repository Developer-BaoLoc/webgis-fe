import { GeoJSON } from 'react-leaflet';

interface Props {
    rivers: any;
    zoom: number;
}

export default function RiverLayer({
    rivers,
    zoom,
}: Props) {
    if (!rivers) return null;

    const getRiverStyle = (feature: any) => {
        const waterway = feature?.properties?.waterway;

        let weight = 0.4;
        let opacity = 0.15;

        if (zoom >= 13) {
            weight = 3;
            opacity = 0.9;
        } else if (zoom >= 11) {
            weight = 2;
            opacity = 0.6;
        } else if (zoom >= 9) {
            weight = 1;
            opacity = 0.35;
        }

        if (waterway === 'river') {
            weight += 1;
        }

        return {
            color: '#1976d2',
            weight,
            opacity,
        };
    };

    return (
        <GeoJSON
            data={rivers}
            style={getRiverStyle}
            onEachFeature={(
                feature: any,
                layer: any,
            ) => {
                layer.bindPopup(`
                    <b>${
                        feature.properties.name ||
                        'Không có tên'
                    }</b>
                `);
            }}
        />
    );
}