import { buildEntityPopupHtml } from '../shared/entityPopup';
import type { CooperativeGroupProperties } from './types';

export function buildCooperativeGroupPopupHtml(
  props: CooperativeGroupProperties,
): string {
  return buildEntityPopupHtml(props);
}
