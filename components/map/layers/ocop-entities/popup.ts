import { buildEntityPopupHtml } from '../shared/entityPopup';
import type { OcopEntityProperties } from './types';

export function buildOcopEntityPopupHtml(
  props: OcopEntityProperties,
): string {
  return buildEntityPopupHtml(props);
}
