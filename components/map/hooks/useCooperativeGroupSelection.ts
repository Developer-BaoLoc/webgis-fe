import usePointSelection from './usePointSelection';
import type { SelectedCooperativeGroup } from '../layers/cooperative-groups/types';
import {
  DEFAULT_MARKER_STYLE,
  SELECTED_MARKER_STYLE,
} from '../layers/cooperative-groups/markerStyles';

export default function useCooperativeGroupSelection() {
  const {
    selectedItem: selectedCooperativeGroup,
    layersRef: cooperativeGroupLayersRef,
    onSelect: onSelectCooperativeGroup,
    onClearSelection,
  } = usePointSelection<SelectedCooperativeGroup>({
    defaultStyle: DEFAULT_MARKER_STYLE,
    selectedStyle: SELECTED_MARKER_STYLE,
  });

  return {
    selectedCooperativeGroup,
    cooperativeGroupLayersRef,
    onSelectCooperativeGroup,
    onClearSelection,
  };
}
