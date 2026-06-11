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
    icon: properties.icon as string | null,
    images: (properties.images as string[]) ?? [],
  };
}

export function toSelectedEffectiveModel(
  properties: EffectiveModelProperties,
): SelectedEffectiveModel {
  return { ...properties };
}
