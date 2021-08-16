import React, { useEffect, useState, Ref } from "react";
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { Props } from "./props";

const AnimatedIcon = Animated.createAnimatedComponent(Entypo);

const AnimatedTextInput: React.ForwardRefRenderFunction<TextInput, Props> = (
  {
    placeholder,
    placeholderTextColor,
    backgroundColor,
    borderColor,
    style,
    ...rest
  }: Props,
  ref: Ref<TextInput>
) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearText = () => setText("");

  const deleteButtonAnimationProgress = useSharedValue(0);
  const placeholderAnimationProgress = useSharedValue(0);

  useEffect(() => {
    if (text === "") deleteButtonAnimationProgress.value = withTiming(0);
    else deleteButtonAnimationProgress.value = withTiming(1);
    if (isFocused) {
      placeholderAnimationProgress.value = withDelay(
        20,
        withTiming(1, { duration: 350 })
      );
    } else if (text === "") {
      placeholderAnimationProgress.value = withDelay(
        20,
        withTiming(0, { duration: 350 })
      );
    }
  }, [isFocused, text]);

  // FIXME: Fix usetheme colors
  const styles = {
    container: {
      //TODO:
      borderColor: borderColor,
      borderWidth: 1,
      height: 60,
      fontSize: 16,
      borderRadius: 10,
      width: 300,
      margin: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      fontSize: 16,
      flex: 1,
      paddingHorizontal: 20,
    },
    deleteButtonStyle: useAnimatedStyle(() => ({
      marginRight: 14,
      opacity: interpolate(deleteButtonAnimationProgress.value, [0, 1], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            deleteButtonAnimationProgress.value,
            [0, 1],
            [8, 0]
          ),
        },
      ],
    })),
    placeholderContainerStyle: useAnimatedStyle(() => ({
      position: "absolute",
      backgroundColor: backgroundColor ?? "black",
      paddingHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [0, 5],
        Extrapolate.CLAMP
      ),
      marginHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [5, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            placeholderAnimationProgress.value,
            [0, 1],
            [0.765, -28],
            Extrapolate.CLAMP
          ),
        },
        { translateX: 20 },
      ],
    })),
    placeholderStyle: useAnimatedStyle(() => ({
      color: placeholderTextColor,
      fontSize: interpolate(
        placeholderAnimationProgress.value,
        [0, 1],
        [15.5, 11],
        Extrapolate.CLAMP
      ),
    })),
  };

  return (
    <TouchableWithoutFeedback onPress={() => ref?.current?.focus()}>
      <View style={styles.container as ViewStyle}>
        <TextInput
          {...rest}
          placeholder=""
          style={[styles.textInput, style]}
          ref={ref}
          value={text}
          onChangeText={setText}
          onSubmitEditing={rest?.onSubmitEditing}
          onFocus={(e) => {
            setIsFocused(true);
            rest?.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest?.onBlur?.(e);
          }}
        />

        <TouchableWithoutFeedback onPress={clearText}>
          <Animated.View style={styles.deleteButtonStyle}>
            <AnimatedIcon name="circle-with-cross" size={24} color="#45A6E5" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={styles.placeholderContainerStyle}>
          <Animated.Text style={styles.placeholderStyle}>
            {placeholder}
          </Animated.Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.forwardRef(AnimatedTextInput);
