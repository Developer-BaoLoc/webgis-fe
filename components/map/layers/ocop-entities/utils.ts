import type {
  OcopEntityProperties,
  SelectedOcopEntity,
} from './types';

export function toOcopEntityProperties(
  properties: Record<string, unknown>,
): OcopEntityProperties {
  return {
    id: properties.id as number,
    name: properties.name as string,
    representative: properties.representative as string,
    address: properties.address as string,
    phone: properties.phone as string,
    status: properties.status as string,
  };
}

export function toSelectedOcopEntity(
  properties: OcopEntityProperties,
): SelectedOcopEntity {
  return {
    id: properties.id,
    name: properties.name,
    representative: properties.representative,
    address: properties.address,
    phone: properties.phone,
    status: properties.status,
  };
}
