import { color } from "app/theme";
import { ColorValue } from "react-native";

function useStatChangeColor(statDifference: number): ColorValue {
  if (statDifference === 0) {
    return color.palette.lightGrey
  } else {
    return statDifference > 0 ? color.palette.success : color.palette.angry
  }
}

export default useStatChangeColor;