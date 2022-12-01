import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { render, screen, fireEvent } from "@testing-library/react-native"
import { AppNavigator } from "app/navigators"
import App from "app/app"

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
// Use with React Native <= 0.63
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")

// Use this instead with React Native >= 0.64
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe("Style view screen", () => {
  test("list screen renders", async () => {
    const component = <App />

    render(component)

    // const firstStyleHeading = await screen.findByText(
    //   "1A. American Light Lager"
    // )
    const firstStyleHeading = await screen.getByText("1A. American Light Lager")

    expect(firstStyleHeading).toBeTruthy()
  })

  test("clicking a beer style navigates to the view screen", async () => {
    const component = <AppNavigator />

    render(component)
    const toClick = await screen.findByText("1A.")

    // navigate to first style view screen
    fireEvent(toClick, "press")

    const nestedStyleToClick = await screen.findByText("American Lager")

    // navigate to nested style view screen
    fireEvent(nestedStyleToClick, "press")
    const nestedStyleHeader = await screen.findByText("1B. American Lager")

    expect(newHeader).toBeTruthy()
  })
})
