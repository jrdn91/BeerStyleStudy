import React, { forwardRef } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Pressable, View } from 'react-native'
import { Text } from '../text/text'
import { Button } from '../button/button'
import { color } from 'app/theme'
import { VitalStatisticsKeys } from '2021-beer-styles'

interface ListSheetProps {
  activeSort: boolean
  onClearSort: () => void
  onSort: (option: VitalStatisticsKeys) => void
}

const snapPoints = ['25%', '50%']

const ListSheet = forwardRef<BottomSheet, ListSheetProps>(({ activeSort, onClearSort, onSort }, ref) => {
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={BottomSheetBackdrop}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ width: "100%", paddingLeft: 12, paddingRight: 12, paddingTop: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ marginBottom: 12 }}>Sort Options</Text>
            {activeSort && <Pressable onPress={onClearSort}><Text style={{ color: color.palette.blue }}>Clear</Text></Pressable>}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button onPress={() => onSort("SRM")} style={{ width: 55 }}><Text style={{ color: "#fff" }}>SRM</Text></Button>
            <Button onPress={() => onSort("ABV")} style={{ width: 55 }}><Text style={{ color: "#fff" }}>ABV</Text></Button>
            <Button onPress={() => onSort("IBUs")} style={{ width: 55 }}><Text style={{ color: "#fff" }}>IBU</Text></Button>
            <Button onPress={() => onSort("OG")} style={{ width: 55 }}><Text style={{ color: "#fff" }}>OG</Text></Button>
            <Button onPress={() => onSort("FG")} style={{ width: 55 }}><Text style={{ color: "#fff" }}>FG</Text></Button>
          </View>
        </View>
      </View>
    </BottomSheet>
  )
})

export default ListSheet