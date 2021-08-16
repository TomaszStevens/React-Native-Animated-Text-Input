import { ColorValue, TextInputProps, TextStyle, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

export interface AnimatedInputProps extends TextInputProps {
  /**
   * The color of the background behind the text-input.
   *
   * The placeholder text is wrapped in a background of this colour, which is responsible for creating the effect of seemingly 'making room'
   * in the upper-left of the text-box for said placeholder text, when the text-input is focused.
   */
  backgroundColor?: ColorValue;

  /**
   * The color of the border of the text-input
   */
  borderColor?: ColorValue;

  /**
   * The color of the delete icon
   */
  deleteIconColor?: ColorValue;

  /**
   *
   */
  placeholderTextStyle?: TextStyle;

  /**
   *
   */
  containerStyle?: ViewStyle;
}

export interface DeleteButtonProps
  extends Pick<AnimatedInputProps, "deleteIconColor"> {
  deleteButtonAnimationProgress: Animated.SharedValue<number>;
  handlePressDelete: () => void;
}

export interface PlaceholderProps
  extends Pick<TextInputProps, "placeholder" | "placeholderTextColor">,
    Pick<AnimatedInputProps, "backgroundColor" | "placeholderTextStyle"> {
  placeholderAnimationProgress: Animated.SharedValue<number>;
}
