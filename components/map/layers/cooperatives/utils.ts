import type {
  CooperativeProperties,
  SelectedCooperative,
} from './types';

export function toCooperativeProperties(
  properties: Record<string, unknown>,
): CooperativeProperties {
  return {
    id: properties.id as number,
    name: properties.name as string,
    representative: properties.representative as string,
    address: properties.address as string,
    business_type: properties.business_type as string,
    phone: properties.phone as string,
    status: properties.status as string,
  };
}

export function toSelectedCooperative(
  properties: CooperativeProperties,
): SelectedCooperative {
  return {
    id: properties.id,
    name: properties.name,
    representative: properties.representative,
    address: properties.address,
    business_type: properties.business_type,
    phone: properties.phone,
    status: properties.status,
  };
}
