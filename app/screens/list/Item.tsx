import { BeerStyle, VitalStatistics, VitalStatisticsKeys } from "2021-beer-styles"
import { Text } from '@/components'
import { SRMColorMap } from '@/srmRgbValues'
import { color, radii, shadows, typography } from '@/theme'
import LinearGradient from 'react-native-linear-gradient';
import React from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

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
const STAT_LINE: ViewStyle = {
  marginVertical: 1,
  flexDirection: "row",
}
const SRM_TEXT_VIEW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 3
}
const SRM_VALUE: ViewStyle = {
  width: "40%"
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
  alignItems: "baseline"
}

interface ItemProps {
  item: BeerStyle
  previousStats: VitalStatistics | null
  sortStat: VitalStatisticsKeys | null
}

const Item = ({ item, previousStats, sortStat }: ItemProps) => {
  const firstColor = SRMColorMap.get(item.properties.vitalStatistics.SRM[0]+"")
  const secondColor = SRMColorMap.get(item.properties.vitalStatistics.SRM[1]+"")

  console.log("previousStats", previousStats)
  console.log("sortStat", sortStat)

  console.log(previousStats?.[sortStat]?.[0] > item.properties.vitalStatistics.SRM[0])

  return (
    <View style={ITEM}>
      <Text style={TEXT}>{item.title}</Text>
      <View style={STAT_LINE}>
        <View style={SRM_VALUE}><Text style={STAT_TEXT}>OG: {item.properties.vitalStatistics.OG[0]} - {item.properties.vitalStatistics.OG[1]}</Text></View>
        <View style={SRM_VALUE}><Text style={STAT_TEXT}>FG: {item.properties.vitalStatistics.FG[0]} - {item.properties.vitalStatistics.FG[1]}</Text></View>
      </View>
      <View style={STAT_LINE}>
        <View style={SRM_VALUE}><Text style={STAT_TEXT}>IBUs: {item.properties.vitalStatistics.IBUs[0]} - {item.properties.vitalStatistics.IBUs[1]}</Text></View>
        <View style={SRM_VALUE}><Text style={STAT_TEXT}>ABV: {item.properties.vitalStatistics.ABV[0]} - {item.properties.vitalStatistics.ABV[1]}</Text></View>
      </View>
      <View>
        <View style={SRM_TEXT_VIEW}>
          <View style={SRM_TEXT_LINE}>
            <Text style={SRM_TEXT}>{item.properties.vitalStatistics.SRM[0]}</Text>
            {sortStat !== null && (
              <>
                <Icon name={previousStats?.[sortStat]?.[0] > item.properties.vitalStatistics.SRM[0] ? "chevron-down" : "chevron-up"} size={12} color={previousStats?.[sortStat]?.[0] > item.properties.vitalStatistics.SRM[0] ? color.palette.angry : color.palette.success} />
                <Text style={{ color: previousStats?.[sortStat]?.[0] > item.properties.vitalStatistics.SRM[0] ? color.palette.angry : color.palette.success, fontSize: 12 }}>
                  {Math.abs(item.properties.vitalStatistics.SRM[0] - previousStats?.[sortStat]?.[0])}
                </Text>
              </>
            )}
          </View>
          <Text style={SRM_TEXT}>SRM</Text>
          <View style={SRM_TEXT_LINE}>
          {sortStat !== null && (
              <>
                <Icon name={previousStats?.[sortStat]?.[1] > item.properties.vitalStatistics.SRM[1] ? "chevron-down" : "chevron-up"} size={12} color={previousStats?.[sortStat]?.[1] > item.properties.vitalStatistics.SRM[1] ? color.palette.angry : color.palette.success} />
                <Text style={{ color: previousStats?.[sortStat]?.[1] > item.properties.vitalStatistics.SRM[1] ? color.palette.angry : color.palette.success, fontSize: 12 }}>
                  {Math.abs(item.properties.vitalStatistics.SRM[1] - previousStats?.[sortStat]?.[1])}
                </Text>
              </>
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