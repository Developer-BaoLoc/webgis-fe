import usePointSelection from './usePointSelection';
import type { SelectedCooperative } from '../layers/cooperatives/types';
import {
  DEFAULT_MARKER_STYLE,
  SELECTED_MARKER_STYLE,
} from '../layers/cooperatives/markerStyles';

export default function useCooperativeSelection() {
  const {
    selectedItem: selectedCooperative,
    layersRef: cooperativeLayersRef,
    onSelect: onSelectCooperative,
    onClearSelection,
  } = usePointSelection<SelectedCooperative>({
    defaultStyle: DEFAULT_MARKER_STYLE,
    selectedStyle: SELECTED_MARKER_STYLE,
  });

  return {
    selectedCooperative,
    cooperativeLayersRef,
    onSelectCooperative,
    onClearSelection,
  };
}
