import { type StyleProp } from 'react-native';
import {
  useAnimatedStyle,
  type SharedValue,
  type AnimatedStyle,
} from 'react-native-reanimated';

interface UseAppropriateStyleParams {
  paddingVerticalIndicator: number;
  sectionTitleHeight: number;
  index: number;
  yCoordinate: SharedValue<number>;
  inactiveStyle: any;
  highlightStyle: any;
}

const useAppropriateStyle = <T = any>({
  paddingVerticalIndicator = 0,
  sectionTitleHeight = 0,
  index = 0,
  yCoordinate,
  inactiveStyle,
  highlightStyle,
}: UseAppropriateStyleParams): StyleProp<AnimatedStyle<StyleProp<T>>> => {
  const animatedStyle = useAnimatedStyle(() => {
    const startYCoordinate =
      0 + paddingVerticalIndicator + index * sectionTitleHeight;
    const isHighlight =
      startYCoordinate <= yCoordinate?.value &&
      yCoordinate?.value <= startYCoordinate + sectionTitleHeight;

    return isHighlight ? highlightStyle : inactiveStyle;
  });

  return animatedStyle;
};

export default useAppropriateStyle;
