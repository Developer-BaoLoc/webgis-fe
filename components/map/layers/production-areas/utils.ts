import type {
  ProductionAreaProperties,
  SelectedProductionArea,
} from './types';

export function toProductionAreaProperties(
  properties: Record<string, unknown>,
): ProductionAreaProperties {
  return {
    id: properties.id as number,
    name: properties.name as string,
    representative: properties.representative as string,
    address: properties.address as string,
    business_type: properties.business_type as string,
    phone: properties.phone as string,
    status: properties.status as string,
    images: (properties.images as string[]) ?? [],
  };
}

export function toSelectedProductionArea(
  properties: ProductionAreaProperties,
): SelectedProductionArea {
  return { ...properties };
}
