'use strict';
import React, {memo} from 'react';
import {StyleSheet, SectionList, DefaultSectionT} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {throttle} from './helper';

interface SectionListScrollIndicatorProps {
  sectionTitles: string[];
  sectionListRef: React.RefObject<SectionList<any, DefaultSectionT>>;
}

interface SectionTitleProps {
  sectionTitle: string;
  index: number;
  y: SharedValue<number>;
}

const SectionTitle: React.FC<SectionTitleProps> = memo(
  ({sectionTitle, y, index}) => {
    const sectionTitleAnimatedStyle = useAnimatedStyle(() => {
      const startYCoordinate =
        0 + PADDING_VERTICAL + index * SECTION_TITLE_HEIGHT;
      const isHighlight =
        startYCoordinate <= y.value &&
        y.value <= startYCoordinate + SECTION_TITLE_HEIGHT;

      return {
        fontSize: isHighlight ? 20 : 12,
      };
    });

    const sectionAnimatedStyle = useAnimatedStyle(() => {
      const startYCoordinate =
        0 + PADDING_VERTICAL + index * SECTION_TITLE_HEIGHT;
      const isHighlight =
        startYCoordinate <= y.value &&
        y.value <= startYCoordinate + SECTION_TITLE_HEIGHT;

      return {
        bottom: isHighlight ? 70 : 0,
        backgroundColor: isHighlight ? '#CDE5FC' : '#F0F2F3',
        width: isHighlight ? 50 : '100%',
        height: isHighlight ? 50 : 20,
        borderRadius: isHighlight ? 25 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ED6262',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: isHighlight ? 0.5 : 0,
      };
    });

    return (
      <Animated.View style={[sectionAnimatedStyle]}>
        <Animated.Text style={[styles.section, sectionTitleAnimatedStyle]}>
          {sectionTitle}
        </Animated.Text>
      </Animated.View>
    );
  },
);

const SectionListScrollIndicator: React.FC<SectionListScrollIndicatorProps> = ({
  sectionTitles,
  sectionListRef,
}) => {
  const y = useSharedValue(0);

  const onScroll = (currentYCoordinate: number) => {
    sectionListRef?.current &&
      throttle(
        () =>
          sectionListRef?.current?.scrollToLocation({
            itemIndex: 0,
            sectionIndex: Math.min(
              parseInt(
                `${
                  (currentYCoordinate - PADDING_VERTICAL) / SECTION_TITLE_HEIGHT
                }`,
                10,
              ),
              sectionTitles.length - 1,
            ),
          }),
        1000,
      )();
  };

  const pan = Gesture.Pan()
    .onUpdate(event => {
      y.value = event.y;
      runOnJS(onScroll)(event.y);
    })
    .onEnd(() => {
      y.value = 0;
    })
    .runOnJS(true);

  const renderSectionTitles = sectionTitles.map(
    (sectionTitle: string, index: number) => (
      <SectionTitle
        sectionTitle={sectionTitle}
        index={index}
        y={y}
        key={`${sectionTitle}_${index}`}
      />
    ),
  );

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={styles.container}>
        {renderSectionTitles}
      </Animated.View>
    </GestureDetector>
  );
};

const PADDING_VERTICAL = 5;
const SECTION_TITLE_HEIGHT = 20;
const styles = StyleSheet.create({
  container: {
    width: 25,
    borderRadius: 12,
    backgroundColor: '#F0F2F3',
    alignItems: 'center',
    paddingVertical: PADDING_VERTICAL,
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 5,
  },
  section: {
    height: SECTION_TITLE_HEIGHT,
    color: '#506CEE',
  },
});

export default memo(SectionListScrollIndicator);
