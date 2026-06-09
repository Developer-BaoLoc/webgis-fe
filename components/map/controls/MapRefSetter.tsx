import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

export default function MapRefSetter({
    mapRef,
}: {
    mapRef: any;
}) {
    const map = useMapEvents({});

    useEffect(() => {
        mapRef.current = map;
    }, [map, mapRef]);

    return null;
}