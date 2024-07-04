/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { SectionList, Text, View, type SectionListProps } from 'react-native';
import mockData from './mockData';
import {
  SectionListScrollIndicator,
  getItemLayoutSectionList,
} from '../../src';

const List = () => {
  const sectionListRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        style={{ flex: 1 }}
        ref={sectionListRef}
        sections={mockData}
        keyExtractor={(item, index) => `${item}_${index}`}
        getItemLayout={
          getItemLayoutSectionList({
            getItemHeight: 100,
            getSectionHeaderHeight: 30,
          }) as SectionListProps<any>['getItemLayout']
        }
        renderItem={({ item, index }) => (
          <View style={{ height: 100 }} key={`${item}_${index}`}>
            <Text>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              height: 30,
              backgroundColor: '#152249',
              color: 'white',
            }}
          >
            {title}
          </Text>
        )}
      />

      <SectionListScrollIndicator
        sectionListRef={sectionListRef}
        sectionTitles={mockData.map((section) => section.title)}
      />
    </View>
  );
};

export default List;
