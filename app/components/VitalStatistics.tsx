import React, { Fragment } from 'react'
import { typography } from '../theme/typography'
import { TextStyle, View, ViewStyle } from 'react-native';
import { Text } from './text/text';
import { BeerStyle, VitalStatistics as VitalStatisticsType } from '2021-beer-styles';
import LinearGradient from 'react-native-linear-gradient';
import { SRMColorMap } from 'app/srmRgbValues';
import { color } from 'app/theme';
const SECTION: ViewStyle = {
  marginVertical: 12
}

const HEADING: TextStyle = {
  ...typography.h2,
  marginBottom: 4
}

const SRM_BAR: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  height: 16,
  width: "100%",
  borderRadius: 8,
  marginTop: 5
}

const STAT_LINE_WRAP: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  marginVertical: 6
}

const STAT_LINE: ViewStyle = {
  marginVertical: 1,
  flexDirection: "column",
  width: "50%",
}

const STAT_TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 14
}

interface VitalStaticsProps {
  style: BeerStyle
}

const VitalStatistics = ({ style }: VitalStaticsProps) => {
  const firstColor = SRMColorMap.get(style.properties.vitalStatistics.SRM[0]+"")
  const secondColor = SRMColorMap.get(style.properties.vitalStatistics.SRM[1]+"")
  
  return (
    <View style={SECTION}>
      <Text style={HEADING}>Vital Statistics</Text>
        <View style={STAT_LINE_WRAP}>
          <View style={STAT_LINE}>
            <View style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}>
              <Text style={STAT_TEXT}>OG: {style.properties.vitalStatistics.OG[0]} - {style.properties.vitalStatistics.OG[1]}</Text>
            </View>
            <Text style={STAT_TEXT}>FG: {style.properties.vitalStatistics.FG[0]} - {style.properties.vitalStatistics.FG[1]}</Text>
          </View>
          <View style={STAT_LINE}>
            <Text style={[STAT_TEXT, { marginBottom: 6 }]}>IBUs: {style.properties.vitalStatistics.IBUs[0]} - {style.properties.vitalStatistics.IBUs[1]}</Text>
            <Text style={STAT_TEXT}>ABV: {style.properties.vitalStatistics.ABV[0]} - {style.properties.vitalStatistics.ABV[1]}</Text>
          </View>
        </View>
        {/* {Object.keys(style.properties.vitalStatistics).map((key) => {
          return <View style={{ flexDirection: "row" }} key={key}><Text style={{ fontSize: 18, paddingRight: 6, paddingLeft: 6 }}>•</Text><Text>{key}: {style.properties.vitalStatistics[key].join(" - ")}</Text></View>
        })} */}
      <LinearGradient locations={[0, 1]} start={{ x: 0, y: 0 }} colors={[`rgb(${firstColor})`, `rgb(${secondColor})`]} style={SRM_BAR} />
    </View>
  )
}

export default VitalStatistics