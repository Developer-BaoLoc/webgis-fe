import type {
  IrrigationProperties,
  SelectedIrrigation,
} from './types';

export function toIrrigationProperties(
  properties: Record<string, unknown>,
): IrrigationProperties {
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

export function toSelectedIrrigation(
  properties: IrrigationProperties,
): SelectedIrrigation {
  return { ...properties };
}
