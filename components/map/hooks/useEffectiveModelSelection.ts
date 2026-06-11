import usePointSelection from './usePointSelection';
import type { SelectedEffectiveModel } from '../layers/effective-models/types';
import {
  DEFAULT_MARKER_STYLE,
  SELECTED_MARKER_STYLE,
} from '../layers/effective-models/markerStyles';

export default function useEffectiveModelSelection() {
  const {
    selectedItem: selectedEffectiveModel,
    layersRef: effectiveModelLayersRef,
    onSelect: onSelectEffectiveModel,
    onClearSelection,
  } = usePointSelection<SelectedEffectiveModel>({
    defaultStyle: DEFAULT_MARKER_STYLE,
    selectedStyle: SELECTED_MARKER_STYLE,
  });

  return {
    selectedEffectiveModel,
    effectiveModelLayersRef,
    onSelectEffectiveModel,
    onClearSelection,
  };
}
