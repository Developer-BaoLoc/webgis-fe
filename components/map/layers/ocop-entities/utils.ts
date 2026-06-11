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
    icon: properties.icon as string | null,
    images: (properties.images as string[]) ?? [],
  };
}

export function toSelectedOcopEntity(
  properties: OcopEntityProperties,
): SelectedOcopEntity {
  return { ...properties };
}
