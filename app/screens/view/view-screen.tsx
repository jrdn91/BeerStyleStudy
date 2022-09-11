import { StackScreenProps } from "@react-navigation/stack"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SRMColorMap } from '@/srmRgbValues'
import {
  Screen,
  Text
} from "../../components"
import PropertySection from "../../components/PropertySection"
import { NavigatorParamList } from "../../navigators"
import { color, typography } from "../../theme"
import VitalStatistics from "app/components/VitalStatistics"
import { BeerStyle } from "2021-beer-styles"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: 8
}

const H1: TextStyle = {
  ...typography.h1
}

const SRM_BAR: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  height: 16,
  width: "100%",
  borderRadius: 8,
  marginTop: 5
}

export const ViewScreen: FC<StackScreenProps<NavigatorParamList, "view">> = ({ navigation, route }) => {
  const style = route?.params as BeerStyle

  const firstColor = SRMColorMap.get(style.properties.vitalStatistics.SRM[0]+"")
  const secondColor = SRMColorMap.get(style.properties.vitalStatistics.SRM[1]+"")

  const insets = useSafeAreaInsets()

  return (
    <View style={FULL}>
      <Screen style={[CONTAINER, { paddingBottom: insets.bottom }]} preset="auto" unsafe>
        <View style={{ paddingVertical: 12 }}>
          <Text style={H1}>{style.title}</Text>
          <LinearGradient locations={[0, 1]} start={{ x: 0, y: 0 }} colors={[`rgb(${firstColor})`, `rgb(${secondColor})`]} style={SRM_BAR} />
        </View>
        <View>
          <VitalStatistics stats={style.properties.vitalStatistics} />
          {Object.keys(style.properties).map((key, idx) => typeof style.properties[key] === "string" ? <PropertySection key={idx} title={key} content={style.properties[key]} /> : null)}
        </View>
      </Screen>
    </View>
  )
}
