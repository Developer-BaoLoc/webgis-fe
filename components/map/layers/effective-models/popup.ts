import { buildEntityPopupHtml } from '../shared/entityPopup';
import type { EffectiveModelProperties } from './types';

export function buildEffectiveModelPopupHtml(
  props: EffectiveModelProperties,
): string {
  return buildEntityPopupHtml(props);
}
