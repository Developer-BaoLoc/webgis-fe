import {
  useEffect,
  useState,
  useCallback,
} from 'react';

import { api } from '@/lib/api';

export default function useMapData() {
  const [wards, setWards] =
    useState<any>(null);

  const [roads, setRoads] =
    useState<any>(null);

  const [rivers, setRivers] =
    useState<any>(null);

  useEffect(() => {
    fetch(api.wards)
      .then((r) => r.json())
      .then(setWards);
  }, []);

  const loadRoads =
    useCallback(async () => {
      if (roads) return;

      const data =
        await fetch(api.roads)
          .then((r) => r.json());

      setRoads(data);
    }, [roads]);

  const loadRivers =
    useCallback(async () => {
      if (rivers) return;

      const data =
        await fetch(api.rivers)
          .then((r) => r.json());

      setRivers(data);
    }, [rivers]);

  return {
    wards,
    roads,
    rivers,
    loadRoads,
    loadRivers,
  };
}