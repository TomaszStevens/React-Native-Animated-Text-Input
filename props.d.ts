import { TextInputProps } from "react-native";

export interface Props extends TextInputProps {
  /**
   * The color of the background behind the text-input.
   *
   * The placeholder text is wrapped in a background of this colour, which is responsible for creating the effect of seemingly 'making room'
   * in the upper-left of the text-box for said placeholder text, when the text-input is focused.
   */
  backgroundColor?: string;

  /**
   * The color of the border of the text-input
   */
  borderColor?: string;
}
