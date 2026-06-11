import { buildEntityPopupHtml } from '../shared/entityPopup';
import type { CooperativeProperties } from './types';

export function buildCooperativePopupHtml(
  props: CooperativeProperties,
): string {
  return buildEntityPopupHtml({
    name: props.name,
    representative: props.representative,
    address: props.address,
    business_type: props.business_type,
    phone: props.phone,
    status: props.status,
    images: props.images,
  });
}
