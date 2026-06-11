import { buildEntityPopupHtml } from '../shared/entityPopup';
import type { ProductionAreaProperties } from './types';

export function buildProductionAreaPopupHtml(
  props: ProductionAreaProperties,
): string {
  return buildEntityPopupHtml(props);
}
