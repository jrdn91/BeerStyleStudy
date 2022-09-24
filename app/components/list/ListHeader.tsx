import React, { useState } from "react";
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";
import { Text } from "../text/text";
import Icon from 'react-native-vector-icons/Feather'
import { color, radii } from "app/theme";

const INPUT: TextStyle = {
  borderWidth: 1,
  borderColor: color.palette.offWhite,
  borderRadius: radii.full,
  width: "100%",
  height: 36,
  paddingHorizontal: 12,
  zIndex: 0
}

const CLEAR_ICON_PRESSABLE: ViewStyle = {
  height: 36,
  width: 36,
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
  alignItems: "center",
  justifyContent: "center"
}

interface ListHeaderProps {
  onChange: (text: string) => void,
  onSortPress: () => void,
  hasActiveSort: boolean
}

const ListHeader = ({ onChange, onSortPress, hasActiveSort }: ListHeaderProps) => {
  const insets = useSafeAreaInsets()

  const [internalState, setInternalState] = useState<string>("")

  const debounced = useDebouncedCallback((value: string) => {
    onChange(value)
  },350);

  const handleOnChangeText = (text: string) => {
    setInternalState(text)
    debounced(text)
  }

  const handleClear = () => {
    setInternalState("")
    onChange("")
  }

  return (
    <View style={{ width: "100%", paddingTop: insets.top, display: "flex", alignItems: "center", paddingBottom: 16, paddingHorizontal: 16, backgroundColor: "#fff", zIndex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <View style={{ flex: 1, alignItems: "flex-start", paddingLeft: 8 }}>
          {/* <Pressable><Icon name="filter" size={18} color={color.palette.blue} /></Pressable> */}
        </View>
        <Text style={{ flex: 0, fontSize: 16, fontWeight: "bold" }}>
          2021 BJCP Styles
        </Text>
        <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 8 }}>
          <Pressable onPress={onSortPress}><Icon name="sliders" size={18} color={hasActiveSort ? color.palette.blue : color.text} /></Pressable>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Search"
          style={INPUT}
          onChangeText={handleOnChangeText}
          value={internalState}
        />
        {internalState.length > 0 && (

          <Pressable style={CLEAR_ICON_PRESSABLE} onPress={handleClear}>
            <Icon name="x-circle" size={18} color={color.dim} />
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default ListHeader