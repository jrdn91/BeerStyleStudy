import { FeatherIconName } from "app/types/feather-icon";

function useStatChangeIcon(statDifference: number): FeatherIconName {
  if (statDifference === 0) {
    return "minus"
  } else {
    return statDifference > 0 ? "chevron-up" : "chevron-down"
  }
}

export default useStatChangeIcon;