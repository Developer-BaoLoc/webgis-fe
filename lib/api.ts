const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const api = {
  wards: `${API_URL}/wards`,
  roads: `${API_URL}/roads`,
  rivers: `${API_URL}/rivers`,
  cooperatives: `${API_URL}/cooperatives`,
  irrigations: `${API_URL}/irrigations`,
  effectiveModels: `${API_URL}/effective-models`,
  ocopEntities: `${API_URL}/ocop-entities`,
  productionAreas: `${API_URL}/production-areas`,

  login: `${API_URL}/auth/login`,

  me: `${API_URL}/users/me`,

  currentWard: (
    lat: number,
    lng: number,
  ) =>
    `${API_URL}/wards/current?lat=${lat}&lng=${lng}`,
};