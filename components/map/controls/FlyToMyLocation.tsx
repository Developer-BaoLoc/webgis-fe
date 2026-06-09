import { useMap } from 'react-leaflet';

export default function FlyToMyLocation({
    currentLocation,
}: {
    currentLocation: [number, number] | null;
}) {
    const map = useMap();

    if (!currentLocation) return null;

    return (
        <button
            onClick={() => {
                map.flyTo(currentLocation, 15, {
                    duration: 1.5,
                });
            }}
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 9999,
                background: '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                cursor: 'pointer',
                fontSize: '24px',
                boxShadow:
                    '0 2px 10px rgba(0,0,0,0.3)',
            }}
        >
            📍
        </button>
    );
}