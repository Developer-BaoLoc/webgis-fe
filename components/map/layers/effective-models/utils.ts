import type {
  EffectiveModelProperties,
  SelectedEffectiveModel,
} from './types';

export function toEffectiveModelProperties(
  properties: Record<string, unknown>,
): EffectiveModelProperties {
  return {
    id: properties.id as number,
    name: properties.name as string,
    representative: properties.representative as string,
    address: properties.address as string,
    business_type: properties.business_type as string,
    phone: properties.phone as string,
    status: properties.status as string,
    type: properties.type as string,
  };
}

export function toSelectedEffectiveModel(
  properties: EffectiveModelProperties,
): SelectedEffectiveModel {
  return {
    id: properties.id,
    name: properties.name,
    representative: properties.representative,
    address: properties.address,
    business_type: properties.business_type,
    phone: properties.phone,
    status: properties.status,
    type: properties.type,
  };
}
