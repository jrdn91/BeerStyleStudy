import { typography } from '../theme/typography'
import React from 'react'
import { Pressable, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from './text/text'
import { underscore, humanize } from "inflection"
import { styleNames } from '../screens/list/list-screen'
import reactStringReplace from 'react-string-replace';
import { useNavigation } from '@react-navigation/native'
import { color } from '../theme/color'
import { uniqueId } from 'lodash'

console.table(styleNames)

const styleRegex = /^(\d+[A-Z]\.|^Specialty\sIPA:|^Historical\sBeer:)\s([A-Za-z\s]+)/

const SECTION: ViewStyle = {
  marginVertical: 12
}

const HEADING: TextStyle = {
  ...typography.h2,
  marginBottom: 4
}

interface PropertySectionProps {
  title: string,
  content: string
}

const PropertySection = ({ title, content }: PropertySectionProps) => {
  const navigation = useNavigation()

  const handleNavigateToStyle = (style) => {
    navigation.push('view', { item: style })
  }

  const getContent = () => {
    let newContent: React.ReactNodeArray
    styleNames.forEach((style) => {
      if (content.indexOf(style.nameString) > -1) {
        newContent = reactStringReplace(newContent ? newContent : content, style.nameString, (match, i) => (
          <Pressable onPress={() => handleNavigateToStyle(style)} key={uniqueId()} style={{ color: "blue", marginBottom: -3.5 }}><Text style={{ color: color.palette.blue }}>{style.nameString}</Text></Pressable>
        ));
      }
    })
    // const contentArray = content.split(" ")
    // return contentArray.map((item) => {
    //   const foundStyle = styleNames.find((style) => style.title.indexOf(item) > -1)
    //   if (foundStyle) {
    //     return (
    //       <Text style={{ color: "blue" }}>{item}</Text>
    //     )
    //   } else {
    //     return <Text>{item+" "}</Text>
    //   }
    // })
    return <Text>{newContent}</Text>
  }

  return (
    <View style={SECTION}>
      <Text style={HEADING}>{humanize(underscore(title))}</Text>
      <Text style={{ lineHeight: 18 }}>{title === "styleComparison" ? getContent() : content}</Text>
    </View>
  )
}

export default PropertySection