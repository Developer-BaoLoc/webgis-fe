import usePointSelection from './usePointSelection';
import type { SelectedIrrigation } from '../layers/irrigations/types';
import {
  DEFAULT_MARKER_STYLE,
  SELECTED_MARKER_STYLE,
} from '../layers/irrigations/markerStyles';

export default function useIrrigationSelection() {
  const {
    selectedItem: selectedIrrigation,
    layersRef: irrigationLayersRef,
    onSelect: onSelectIrrigation,
    onClearSelection,
  } = usePointSelection<SelectedIrrigation>({
    defaultStyle: DEFAULT_MARKER_STYLE,
    selectedStyle: SELECTED_MARKER_STYLE,
  });

  return {
    selectedIrrigation,
    irrigationLayersRef,
    onSelectIrrigation,
    onClearSelection,
  };
}
