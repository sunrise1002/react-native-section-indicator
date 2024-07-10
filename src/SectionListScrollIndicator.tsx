import React, { memo } from 'react';
import {
  StyleSheet,
  SectionList,
  Dimensions,
  View,
  type DefaultSectionT,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { throttle } from './utils/throttle';
import useAppropriateStyle from './hook/useAppropriateStyle';

const THROTTLE_DURATION = 200;

export interface SectionListScrollIndicatorProps {
  sectionTitles: string[];
  sectionListRef: React.RefObject<SectionList<any, DefaultSectionT>>;
  topContainer?: number;
  paddingVerticalContainer?: number;
  sectionTitleHeight?: number;
  indicatorContainerStyle?: ViewStyle;
  sectionTitleInactiveStyle?: TextStyle;
  sectionTitleHighlightStyle?: TextStyle;
  sectionInactiveStyle?: ViewStyle;
  sectionHighlightStyle?: ViewStyle;
  throttleDuration?: number;
  throttleFunc?: any;
}

export interface SectionTitleProps {
  sectionTitle: string;
  index: number;
  y: SharedValue<number>;
  sectionTitleHeight?: number;
  sectionTitleInactiveStyle?: TextStyle;
  sectionTitleHighlightStyle?: TextStyle;
  sectionInactiveStyle?: ViewStyle;
  sectionHighlightStyle?: ViewStyle;
}

const SectionTitle: React.FC<SectionTitleProps> = memo(
  ({
    sectionTitle,
    y,
    index,
    sectionTitleHeight,
    sectionTitleInactiveStyle = {},
    sectionTitleHighlightStyle = {},
    sectionInactiveStyle = {},
    sectionHighlightStyle = {},
  }) => {
    const sectionTitleAnimatedStyle = useAppropriateStyle<TextStyle>({
      paddingVerticalIndicator: PADDING_VERTICAL,
      sectionTitleHeight: SECTION_TITLE_HEIGHT,
      index,
      yCoordinate: y,
      inactiveStyle: {
        ...styles.sectionTitleInactiveStyle,
        ...sectionTitleInactiveStyle,
      },
      highlightStyle: {
        ...styles.sectionTitleHighlightStyle,
        ...sectionTitleHighlightStyle,
      },
    });

    const sectionAnimatedStyle = useAppropriateStyle<ViewStyle>({
      paddingVerticalIndicator: PADDING_VERTICAL,
      sectionTitleHeight: SECTION_TITLE_HEIGHT,
      index,
      yCoordinate: y,
      inactiveStyle: {
        ...styles.sectionInactiveStyle,
        ...sectionInactiveStyle,
      },
      highlightStyle: {
        ...styles.sectionHighlightStyle,
        ...sectionHighlightStyle,
      },
    });

    const emptyViewStyle = useAppropriateStyle<ViewStyle>({
      paddingVerticalIndicator: PADDING_VERTICAL,
      sectionTitleHeight: SECTION_TITLE_HEIGHT,
      index,
      yCoordinate: y,
      inactiveStyle: styles.emptyViewInactiveStyle,
      highlightStyle: {
        ...styles.emptyViewHighlightStyle,
        height: sectionTitleHeight,
      },
    });

    return (
      <View style={styles.sectionTitleWrapper}>
        <Animated.View style={sectionAnimatedStyle}>
          <Animated.Text style={sectionTitleAnimatedStyle}>
            {sectionTitle}
          </Animated.Text>
        </Animated.View>

        <Animated.View style={emptyViewStyle} />
      </View>
    );
  }
);

const SectionListScrollIndicator: React.FC<SectionListScrollIndicatorProps> = ({
  sectionTitles,
  sectionListRef,
  topContainer,
  paddingVerticalContainer,
  sectionTitleHeight,
  indicatorContainerStyle = {},
  sectionTitleInactiveStyle = {},
  sectionTitleHighlightStyle = {},
  sectionInactiveStyle = {},
  sectionHighlightStyle = {},
  throttleDuration,
  throttleFunc,
}) => {
  const y = useSharedValue(0);

  const finalPaddingTopIndicator = (paddingVerticalContainer ??
    indicatorContainerStyle?.paddingVertical ??
    indicatorContainerStyle?.paddingTop ??
    PADDING_VERTICAL) as number;
  const finalSectionTitleHeight = (sectionTitleHeight ??
    sectionInactiveStyle?.height ??
    SECTION_TITLE_HEIGHT) as number;
  const topContainerPosition =
    topContainer ??
    Math.max(
      height -
        finalPaddingTopIndicator -
        (sectionTitles?.length || 0) * finalSectionTitleHeight,
      0
    ) / 2;

  const onScroll = (currentYCoordinate: number) => {
    const finalThrottleFunc = throttleFunc || throttle;
    sectionListRef?.current &&
      finalThrottleFunc(() => {
        sectionListRef?.current?.scrollToLocation({
          itemIndex: 0,
          sectionIndex: Math.min(
            parseInt(
              `${
                (currentYCoordinate - PADDING_VERTICAL) / SECTION_TITLE_HEIGHT
              }`,
              10
            ),
            sectionTitles.length - 1
          ),
        });
      }, throttleDuration ?? THROTTLE_DURATION)();
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
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
        sectionTitleHeight={finalSectionTitleHeight}
        sectionTitleInactiveStyle={sectionTitleInactiveStyle}
        sectionTitleHighlightStyle={sectionTitleHighlightStyle}
        sectionInactiveStyle={sectionInactiveStyle}
        sectionHighlightStyle={sectionHighlightStyle}
      />
    )
  );

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          indicatorContainerStyle,
          { top: topContainerPosition },
        ]}
      >
        {renderSectionTitles}
      </Animated.View>
    </GestureDetector>
  );
};

const PADDING_VERTICAL = 5;
const SECTION_TITLE_HEIGHT = 20;
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: 25,
    borderRadius: 12,
    backgroundColor: '#D5D7F2',
    alignItems: 'center',
    paddingVertical: PADDING_VERTICAL,
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  sectionTitleWrapper: {
    alignItems: 'center',
  },
  sectionTitleInactiveStyle: {
    fontSize: 12,
    color: '#3D46F2',
    fontWeight: '500',
  },
  sectionTitleHighlightStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  sectionInactiveStyle: {
    bottom: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: SECTION_TITLE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sectionHighlightStyle: {
    bottom: 70,
    backgroundColor: '#636AF2',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  emptyViewInactiveStyle: {
    height: 0,
  },
  emptyViewHighlightStyle: {
    height: SECTION_TITLE_HEIGHT,
  },
});

export default memo(SectionListScrollIndicator);
