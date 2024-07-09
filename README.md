# react-native-section-indicator

React Native section scroll indicator

<p align="center" >
  <kbd>
    <img
      src="https://github.com/sunrise1002/react-native-section-indicator/blob/main/docs/assets/scroll.gif?raw=true"
      title="Scroll Demo"
    >
  </kbd>
  <br>
  <em>React Native section scroll indicator example app.</em>
</p>

`react-native-section-indicator` is a customizable section indicator for React Native's `SectionList` component, providing an easy way to navigate through sections.

## Libraries Required

To use this project, you need to install the following libraries:

- `react-native-gesture-handler`
- `react-native-reanimated`

## Installation

Install the package using Yarn or NPM:

```sh
yarn add react-native-section-indicator
npm install react-native-section-indicator
```

## Usage

```js
import React, { useRef } from 'react'
import { SectionList, View } from 'react-native'
import { SectionListScrollIndicator, getItemLayoutSectionList } from 'react-native-section-indicator'

const App = () => {
  const sectionListRef = useRef(null)

  return (
    <View>
      <SectionList
        ref={sectionListRef}
        getItemLayout={
          getItemLayoutSectionList({
            getItemHeight: 60, // Section list item's height
            getSectionHeaderHeight: 40, // Section list header height
            // Other props:
            // getListHeaderHeight
            // getItemSeparatorHeight
            // getSectionFooterHeight
            // getSectionSeparatorHeight
          })
        }
        // other SectionList props
      />

      <SectionListScrollIndicator
        sectionListRef={sectionListRef}
        sectionTitles={[]} // Array of section titles
      />
    </View>
  )
}

export default App

```

## Available props for SectionListScrollIndicator
| Name                             | Type                                              | Description                                       |
| -------------------------------- | -------------------- | ------------------------------------------------------------------------------ |
| `sectionTitles`                  | `string[]`                                        | (REQUIRED)Array of section titles                 |
| `sectionListRef`                 | `RefObject<SectionList<any, DefaultSectionT>>`    | (REQUIRED)Section list ref                        |
| `topContainer`                   | `number`                                          | Top layout prop of indicator container            |
| `paddingVerticalContainer`       | `number`                                          | Padding vertical indicator container              |
| `sectionTitleHeight`             | `number`                                          | Section title height                              |
| `indicatorContainerStyle`        | `ViewStyle`                                       | Custom style for indicator container              |
| `sectionTitleInactiveStyle`      | `TextStyle`                                       | Custom style inactive for section title           |
| `sectionTitleHighlightStyle`     | `TextStyle`                                       | Custom style highlight for section title          |
| `sectionInactiveStyle`           | `ViewStyle`                                       | Custom style inactive for section title wrapper   |
| `sectionHighlightStyle`          | `ViewStyle`                                       | Custom style highlight for section title wrapper  |
| `throttleDuration`               | `number`                                          | Custom throttle duration, default is 200 ms       |
| `throttleFunc`                   | `any`                                             | Use your own throttle function                    |                 

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
