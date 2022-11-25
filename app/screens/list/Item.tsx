import { BeerStyle, VitalStatistics, VitalStatisticsKeys } from "2021-beer-styles"
import { Text } from '@/components'
import { SRMColorMap } from '@/srmRgbValues'
import { color, radii, shadows, typography } from '@/theme'
import LinearGradient from 'react-native-linear-gradient';
import React from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import StatChangeText from "app/components/list/StatChangeText";
import useStatChangeColor from "app/hooks/useStatChangeColor";

const TEXT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
  marginBottom: 3,
}
const ITEM: ViewStyle = {
  backgroundColor: color.palette.white,
  ...shadows.card,
  borderRadius: radii.md,
  marginBottom: 8,
  marginHorizontal: 8,
  padding: 8,
  marginTop: 8,
}
const STAT_TEXT: TextStyle = {
  color: color.palette.lightGrey,
  ...typography.subtitle
}
const STAT_LINE_WRAP: ViewStyle = {
  display: "flex",
  flexDirection: "row"
}
const STAT_LINE: ViewStyle = {
  marginVertical: 1,
  flexDirection: "column",
  width: "50%",
}
const SRM_TEXT_VIEW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const SRM_TEXT: TextStyle = {
  fontSize: 14,
  marginTop: 4,
}
const SRM_BAR: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  height: 8,
  width: "100%",
  borderRadius: 4,
  marginTop: 5
}

const SRM_TEXT_LINE: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"
}

interface ItemProps {
  item: BeerStyle
  previousStats: VitalStatistics | null
  sortStat: VitalStatisticsKeys | null
}

const Item = ({ item, previousStats, sortStat }: ItemProps) => {
  const firstColor = SRMColorMap.get(item.properties.vitalStatistics.SRM[0]+"")
  const secondColor = SRMColorMap.get(item.properties.vitalStatistics.SRM[1]+"")

  // helps with type guarding StatChangeText component math
  const statsAreNumberType = typeof item.properties.vitalStatistics.ABV[0] === "number"

  const shouldShowStatChange = (stat: VitalStatisticsKeys) => previousStats && stat === sortStat && statsAreNumberType

  return (
    <View style={ITEM}>
      <Text style={TEXT}>{item.title}</Text>
      <View style={STAT_LINE_WRAP}>
        <View style={STAT_LINE}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[STAT_TEXT, { width: 40 }]}>OG:</Text>
            <View style={{ flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "space-around", paddingRight: 8 }}>
              <View style={{ display: 'flex', flexDirection: "row", alignItems: "baseline" }}>
                <Text style={[STAT_TEXT, { color: shouldShowStatChange("OG") ? useStatChangeColor(previousStats.OG[0] - item.properties.vitalStatistics.OG[0]) : color.palette.lightGrey }]}>{item.properties.vitalStatistics.OG[0]}</Text>
              </View>
              <Text style={[STAT_TEXT, { width: 12, flex: 0 }]}>-</Text>
              <View style={{ display: 'flex', flexDirection: "row", alignItems: "baseline" }}>
              <Text style={[STAT_TEXT, { color: shouldShowStatChange("OG") ? useStatChangeColor(previousStats.OG[1] - item.properties.vitalStatistics.OG[1]) : color.palette.lightGrey }]}>{item.properties.vitalStatistics.OG[1]}</Text>
              </View>
            </View>
          </View>
          <Text style={STAT_TEXT}>FG: {item.properties.vitalStatistics.FG[0]} - {item.properties.vitalStatistics.FG[1]}</Text>
        </View>
        <View style={STAT_LINE}>
          <Text style={STAT_TEXT}>IBUs: {item.properties.vitalStatistics.IBUs[0]} - {item.properties.vitalStatistics.IBUs[1]}</Text>
          <Text style={STAT_TEXT}>ABV: {item.properties.vitalStatistics.ABV[0]} - {item.properties.vitalStatistics.ABV[1]}</Text>
        </View>
      </View>
      <View>
        <View style={SRM_TEXT_VIEW}>
          <View style={SRM_TEXT_LINE}>
            <Text style={SRM_TEXT}>{item.properties.vitalStatistics.SRM[0]}</Text>
            {sortStat === "SRM" && previousStats !== null && statsAreNumberType && (
              <StatChangeText
                previousStat={previousStats.SRM[0] as number}
                currentStat={item.properties.vitalStatistics.SRM[0] as number}
              />
            )}
          </View>
          <Text style={SRM_TEXT}>SRM</Text>
          <View style={SRM_TEXT_LINE}>
          {sortStat === "SRM" && previousStats !== null && statsAreNumberType && (
              <StatChangeText
                previousStat={previousStats.SRM[1] as number}
                currentStat={item.properties.vitalStatistics.SRM[1] as number}
              />
            )}
            <Text style={SRM_TEXT}>{item.properties.vitalStatistics.SRM[1]}</Text>
          </View>
        </View>
        <LinearGradient locations={[0, 1]} start={{ x: 0, y: 0 }} colors={[`rgb(${firstColor})`, `rgb(${secondColor})`]} style={SRM_BAR} />
      </View>
    </View>
  )
}

export default Item