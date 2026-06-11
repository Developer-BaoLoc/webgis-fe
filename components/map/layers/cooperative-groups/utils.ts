import type {
  CooperativeGroupProperties,
  SelectedCooperativeGroup,
} from './types';

export function toCooperativeGroupProperties(
  properties: Record<string, unknown>,
): CooperativeGroupProperties {
  return {
    id: properties.id as number,
    name: properties.name as string,
    representative: properties.representative as string,
    address: properties.address as string,
    business_type: properties.business_type as string,
    phone: properties.phone as string,
    status: properties.status as string,
    icon: properties.icon as string | null,
    images: (properties.images as string[]) ?? [],
  };
}

export function toSelectedCooperativeGroup(
  properties: CooperativeGroupProperties,
): SelectedCooperativeGroup {
  return { ...properties };
}
