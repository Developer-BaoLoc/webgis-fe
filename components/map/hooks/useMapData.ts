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

  const [cooperatives, setCooperatives] =
    useState<any>(null);

  const [cooperativeGroups, setCooperativeGroups] =
    useState<any>(null);

  const [irrigations, setIrrigations] =
    useState<any>(null);

  const [effectiveModels, setEffectiveModels] =
    useState<any>(null);

  const [ocopEntities, setOcopEntities] =
    useState<any>(null);

  const [productionAreas, setProductionAreas] =
    useState<any>(null);

  useEffect(() => {
    fetch(api.wards)
      .then((r) => r.json())
      .then(setWards);
  }, []);

  useEffect(() => {
    fetch(api.cooperatives)
      .then((r) => r.json())
      .then(setCooperatives);
  }, []);

  useEffect(() => {
    fetch(api.cooperativeGroups)
      .then((r) => r.json())
      .then(setCooperativeGroups);
  }, []);

  useEffect(() => {
    fetch(api.irrigations)
      .then((r) => r.json())
      .then(setIrrigations);
  }, []);

  useEffect(() => {
    fetch(api.effectiveModels)
      .then((r) => r.json())
      .then(setEffectiveModels);
  }, []);

  useEffect(() => {
    fetch(api.ocopEntities)
      .then((r) => r.json())
      .then(setOcopEntities);
  }, []);

  useEffect(() => {
    fetch(api.productionAreas)
      .then((r) => r.json())
      .then(setProductionAreas);
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
    cooperatives,
    cooperativeGroups,
    irrigations,
    effectiveModels,
    ocopEntities,
    productionAreas,
    loadRoads,
    loadRivers,
  };
}
