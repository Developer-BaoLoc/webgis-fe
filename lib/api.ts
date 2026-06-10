const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const api = {
  wards: `${API_URL}/wards`,
  roads: `${API_URL}/roads`,
  rivers: `${API_URL}/rivers`,
  cooperatives: `${API_URL}/cooperatives`,

  login: `${API_URL}/auth/login`,

  me: `${API_URL}/users/me`,

  currentWard: (
    lat: number,
    lng: number,
  ) =>
    `${API_URL}/wards/current?lat=${lat}&lng=${lng}`,
};