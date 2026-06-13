const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? '';

export const api = {
  wards: `${API_URL}/wards`,
  roads: `${API_URL}/roads`,
  rivers: `${API_URL}/rivers`,
  cooperatives: `${API_URL}/cooperatives`,
  cooperativeGroups: `${API_URL}/cooperative-groups`,
  irrigations: `${API_URL}/irrigations`,
  effectiveModels: `${API_URL}/effective-models`,
  ocopEntities: `${API_URL}/ocop-entities`,
  productionAreas: `${API_URL}/production-areas`,

  login: `${API_URL}/auth/login`,
  me: `${API_URL}/users/me`,

  media: `${API_URL}/media`,
  mediaByEntity: (
    entityType: string,
    entityId: number,
  ) =>
    `${API_URL}/media/entity/${entityType}/${entityId}`,
  mediaUpload: `${API_URL}/media/upload`,
  mediaDelete: (id: number) =>
    `${API_URL}/media/${id}`,

  adminEntity: (entity: string) =>
    `${API_URL}/admin/${entity}`,
  adminEntityById: (
    entity: string,
    id: number,
  ) => `${API_URL}/admin/${entity}/${id}`,

  currentWard: (
    lat: number,
    lng: number,
  ) =>
    `${API_URL}/wards/current?lat=${lat}&lng=${lng}`,
  
  // Address/location endpoints
  wards: `${API_URL}/wards`,
  districts: `${API_URL}/districts`,
  provinces: `${API_URL}/provinces`,
};
