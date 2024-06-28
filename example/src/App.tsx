import React, {useRef} from 'react';
import {
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import mockData from './mockData';
import SectionListScrollIndicator from './SectionListScrollIndicator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const sectionListRef = useRef(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <SectionList
          style={{flex: 1}}
          ref={sectionListRef}
          sections={mockData}
          keyExtractor={(item, index) => item + index}
          getItemLayout={}
          renderItem={({item}) => (
            <View style={{marginVertical: 50}}>
              <Text>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontSize: 20, fontWeight: '800'}}>{title}</Text>
          )}
        />

        <SectionListScrollIndicator
          sectionListRef={sectionListRef}
          sectionTitles={mockData.map(section => section.title)}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;
