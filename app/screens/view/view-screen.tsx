import { BeerStyle } from "2021-beer-styles"
import { SRMColorMap } from '@/srmRgbValues'
import { StackScreenProps } from "@react-navigation/stack"
import VitalStatistics from "app/components/VitalStatistics"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  Screen
} from "../../components"
import PropertySection from "../../components/PropertySection"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: 8
}

export const ViewScreen: FC<StackScreenProps<NavigatorParamList, "view">> = ({ navigation, route }) => {
  const style = route?.params as BeerStyle

  const insets = useSafeAreaInsets()

  return (
    <View style={FULL}>
      <Screen style={[CONTAINER, { paddingBottom: insets.bottom }]} preset="auto" unsafe>
        <View style={{ paddingTop: 12 }}>
          <VitalStatistics style={style} />
          {/* {Object.keys(style.properties).map((key, idx) => typeof style.properties[key] === "string" ? <PropertySection key={idx} title={key} content={style.properties[key]} /> : null)} */}
          {typeof style.properties.overallImpression === "string" && <PropertySection title="overallImpression" content={style.properties.overallImpression} />}
          {typeof style.properties.styleComparison === "string" && <PropertySection title="styleComparison" content={style.properties.styleComparison} />}
          {typeof style.properties.appearance === "string" && <PropertySection title="appearance" content={style.properties.appearance} />}
          {typeof style.properties.aroma === "string" && <PropertySection title="aroma" content={style.properties.aroma} />}
          {typeof style.properties.flavor === "string" && <PropertySection title="flavor" content={style.properties.flavor} />}
          {typeof style.properties.mouthfeel === "string" && <PropertySection title="mouthfeel" content={style.properties.mouthfeel} />}
          {typeof style.properties.characteristicIngredients === "string" && <PropertySection title="characteristicIngredients" content={style.properties.characteristicIngredients} />}
          {typeof style.properties.history === "string" && <PropertySection title="history" content={style.properties.history} />}
          {typeof style.properties.comments === "string" && <PropertySection title="comments" content={style.properties.comments} />}
          {typeof style.properties.commercialExamples === "string" && <PropertySection title="commercialExamples" content={style.properties.commercialExamples} />}
          {typeof style.properties.tags === "string" && <PropertySection title="tags" content={style.properties.tags} />}
        </View>
      </Screen>
    </View>
  )
}
