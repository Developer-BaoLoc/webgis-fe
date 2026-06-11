import usePointSelection from './usePointSelection';
import type { SelectedOcopEntity } from '../layers/ocop-entities/types';
import {
  DEFAULT_MARKER_STYLE,
  SELECTED_MARKER_STYLE,
} from '../layers/ocop-entities/markerStyles';

export default function useOcopEntitySelection() {
  const {
    selectedItem: selectedOcopEntity,
    layersRef: ocopEntityLayersRef,
    onSelect: onSelectOcopEntity,
    onClearSelection,
  } = usePointSelection<SelectedOcopEntity>({
    defaultStyle: DEFAULT_MARKER_STYLE,
    selectedStyle: SELECTED_MARKER_STYLE,
  });

  return {
    selectedOcopEntity,
    ocopEntityLayersRef,
    onSelectOcopEntity,
    onClearSelection,
  };
}
