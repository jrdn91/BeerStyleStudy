import BeerStyles, { BeerCategory, BeerStyle } from "2021-beer-styles"
import BottomSheet from '@gorhom/bottom-sheet'
import { StackScreenProps } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import Fuse from 'fuse.js'
import { omit, orderBy } from "lodash"
import React, { FC, useMemo, useRef, useState } from "react"
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"
import Modal from "react-native-modal"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/Feather'
import { useDebouncedCallback } from "use-debounce"
import {
  Screen,
  Text
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, radii, shadows, typography } from "../../theme"
import Item from "./Item"

// import BottomSheet from '@gorhom/bottom-sheet';

const searchOptions = {
  includeScore: true,
  keys: ['styles.title'],
  includeMatches: true,
  threshold: 0.2
}

const styleSearchOptions = {
  includeScore: true,
  keys: ['title'],
  includeMatches: true,
  threshold: 0.2
}

const styleRegex = /^(\d+[A-Z]\.|^Specialty\sIPA:|^Historical\sBeer:)\s([A-Za-z\säè]+)/

const beerData: BeerCategory[] = BeerStyles as BeerCategory[]

interface Section extends BeerCategory {
  type: string
}

const fuse = new Fuse(beerData, searchOptions)

export const styleNames = beerData.map((cat) => cat.styles.map((style) => {
  const match = style.title.match(styleRegex)
  return { ...style, nameString: match?.[2] || "" }
})).flat()

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.background,
}
const LIST: ViewStyle = {
  backgroundColor: color.transparent
}
const TEXT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
}
const SECTION: ViewStyle = {
  backgroundColor: color.palette.lighterGrey,
  paddingVertical: 8,
  paddingHorizontal: 16,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}
const BOLD: TextStyle = { fontWeight: "bold", color: color.text }
const MODAL: ViewStyle = {
  backgroundColor: color.palette.white,
  ...shadows.modal,
  borderRadius: radii.lg,
  display: "flex",
  paddingVertical: 8
}
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

interface Contact {
  firstName: string;
  lastName: string;
}

interface Section {
  title: string;
  data: Contact[];
}

const contacts: (string | Contact)[] = [
  "A",
  { firstName: "John", lastName: "Aaron" },
  "D",
  { firstName: "John", lastName: "Doe" },
  { firstName: "Mary", lastName: "Dianne" },
];

const Section = ({ item, onOpenModal }: { item: BeerCategory, onOpenModal: (description: string) => void }) => {
  return (
    <View style={SECTION}>
      <Text style={BOLD}>{item.title}</Text>
      {item.description && (
        <>
          <Pressable onPress={() => onOpenModal(item.description)}><Icon name="info" size={18} color={color.palette.blue} /></Pressable>
        </>
      )}
    </View>
  )
}

const CloseButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{
        padding: 8,
      }}>
        <Icon name="x" size={24} color={color.text} />
      </View>
    </Pressable>
  )
}

const ModalContent = ({ description, onClose }: { description: string, onClose: () => void }) => {
  return (
    <View style={MODAL}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 12 }}>Description</Text>
        <CloseButton onPress={onClose} />
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{ ...TEXT, marginTop: 8 }}>{description}</Text>
      </View>
    </View>
  )
}

interface ListHeaderProps {
  onChange: (text: string) => void,
  onSortPress: () => void
}

const ListHeader = ({ onChange, onSortPress }: ListHeaderProps) => {
  const insets = useSafeAreaInsets()

  const [internalState, setInternalState] = useState<string>("")

  const debounced = useDebouncedCallback((value: string) => {
    console.log(value)
    // setInternalState(value)
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
          <Pressable onPress={onSortPress}><Icon name="shuffle" size={18} color={color.palette.blue} /></Pressable>
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

export const ListScreen: FC<StackScreenProps<NavigatorParamList, "list">> = ({ navigation }) => {
  // bottom sheet stuff
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = ['25%', '50%']
  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
  }

  const parentRef = useRef(null)
  const fuseRefs = useRef<{[key: string]: Fuse<BeerStyle>}>(beerData.reduce((prev, next) => ({ ...prev, [next.title]: new Fuse(next.styles, styleSearchOptions) }), {}))

  const insets = useSafeAreaInsets()

  const [modalContent, setModalContent] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchText, setSearchText] = useState("")


  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: ListHeader,
  //     // headerStyle: {
  //     //   height: 120,
  //     //   backgroundColor: "lightgreen"
  //     // },
  //   })
  // }, [])

  const handleOpenModal = (description: string) => {
    setModalContent(description)
    setIsModalVisible(true)
  }

  const handleNavigateToView = (item: object) => {
    navigation.push("view", { item })
  }

  const searchedStyles = useMemo<BeerCategory[]>(() => {
    if (searchText) {
      const searchResults = fuse.search(searchText)
      return orderBy(searchResults, ["score"], ["desc"]).map((result) => {
        const styleFuseRef = fuseRefs.current[result.item.title]
        return {
        ...result.item,
        styles: orderBy(styleFuseRef.search(searchText), ["score"], ["desc"]).map((styleResult) => styleResult.item)
      }})
    } else {
      return beerData
    }
  }, [searchText])

  console.log("searchedStyles", searchedStyles)

  const sectionedBeerData: Section[] = searchedStyles.reduce((prev: Section[], category: BeerCategory) => {
    return [...prev, {
      ...omit(category, ["styles"]),
      type: "category"
    }, ...category.styles.map((style) => ({ ...style, type: "style" }))];
  }, [])

  const stickyHeaderIndices = sectionedBeerData
  .map((item, index) => {
    if (item.type === "category") {
      return index;
    } else {
      return null;
    }
  })
  .filter((item) => item !== null) as number[];

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand()
  }

  return (
      <>
      <View style={FULL} ref={parentRef}>
        <Screen style={CONTAINER} preset="fixed" unsafe>
          <ListHeader onChange={setSearchText} onSortPress={handleOpenBottomSheet} />
          <FlashList
            contentContainerStyle={LIST}
            data={sectionedBeerData}
            renderItem={({ item }) => {
              if (item.type === "category") {
                // Rendering header
                return <Section item={item} onOpenModal={handleOpenModal} />
              } else {
                // Render item
                return <Pressable onPress={() => handleNavigateToView(item)}><Item item={item} /></Pressable>
              }
            }}
            stickyHeaderIndices={stickyHeaderIndices}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return item.type === "category" ? "sectionHeader" : "row";
            }}
            estimatedItemSize={100}
            ListFooterComponentStyle={{
              height: insets.bottom
            }}
          />
          <Modal isVisible={isModalVisible}>
            <SafeAreaView>
              <ModalContent description={modalContent} onClose={() => setIsModalVisible(false)} />
            </SafeAreaView>
          </Modal>
          {/* <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
          >
            <View style={{ flex: 1 }}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheet> */}
        </Screen>
      </View>
      <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
    </>
  )
}
