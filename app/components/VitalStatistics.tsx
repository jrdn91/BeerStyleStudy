import React, { Fragment } from 'react'
import { typography } from '../theme/typography'
import { TextStyle, View, ViewStyle } from 'react-native';
import { Text } from './text/text';
import { VitalStatistics as VitalStatisticsType } from '2021-beer-styles';
const SECTION: ViewStyle = {
  marginVertical: 12
}

const HEADING: TextStyle = {
  ...typography.h2,
  marginBottom: 4
}

interface VitalStaticsProps {
  stats: VitalStatisticsType
}

const VitalStatistics = ({ stats }: VitalStaticsProps) => {
  return (
    <View style={SECTION}>
      <Text style={HEADING}>Vital Statistics</Text>
        {Object.keys(stats).map((key) => {
          return <View style={{ flexDirection: "row" }} key={key}><Text style={{ fontSize: 18, paddingRight: 6, paddingLeft: 6 }}>•</Text><Text>{key}: {stats[key].join(" - ")}</Text></View>
        })}
    </View>
  )
}

export default VitalStatistics