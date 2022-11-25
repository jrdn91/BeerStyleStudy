import useStatChangeColor from 'app/hooks/useStatChangeColor'
import useStatChangeIcon from 'app/hooks/useStatChangeIcon'
import { color } from 'app/theme'
import { FeatherIconName } from 'app/types/feather-icon'
import React, { useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Text } from '../text/text'

interface StatChangeTextProps {
  previousStat: number
  currentStat: number
}

const VIEW_STYLE: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: 4,
  marginTop: 4,
  alignItems: "center"
}

const StatChangeText = ({ previousStat, currentStat }: StatChangeTextProps) => {
  const statDifference = currentStat - previousStat

  const statChangeColor = useStatChangeColor(statDifference)

  const statChangeIcon = useStatChangeIcon(statDifference)

  return (
    <View style={VIEW_STYLE}>
      <Icon name={statChangeIcon} size={12} color={statChangeColor} style={{ marginTop: 1 }} />
      <Text style={{ color: statChangeColor, fontSize: 12 }}>
        {Math.abs(currentStat - previousStat)}
      </Text>
    </View>
  )
}

export default StatChangeText