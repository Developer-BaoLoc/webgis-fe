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
  };
}

export function toSelectedProductionArea(
  properties: ProductionAreaProperties,
): SelectedProductionArea {
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
