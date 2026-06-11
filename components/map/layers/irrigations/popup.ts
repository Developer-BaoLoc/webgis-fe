import { buildEntityPopupHtml } from '../shared/entityPopup';
import type { IrrigationProperties } from './types';

export function buildIrrigationPopupHtml(
  props: IrrigationProperties,
): string {
  return buildEntityPopupHtml(props);
}
