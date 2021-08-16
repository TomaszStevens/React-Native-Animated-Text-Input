import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
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
import {
  DeleteButtonProps,
  PlaceholderProps,
  AnimatedInputProps,
} from "./prop-types";

const AnimatedIcon = Animated.createAnimatedComponent(Entypo);

const AnimatedTextInput = React.forwardRef<TextInput, AnimatedInputProps>(
  (
    {
      placeholder,
      placeholderTextColor,
      backgroundColor,
      borderColor,
      deleteIconColor,
      style,
      containerStyle,
      placeholderTextStyle,
      defaultValue,
      onChangeText,
      onFocus,
      onBlur,
      ...rest
    }: AnimatedInputProps,
    ref
  ) => {
    const [text, setText] = useState(defaultValue ?? "");
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = ref ?? useRef<TextInput>(null);

    const styles = {
      container: {
        borderColor: borderColor,
        borderWidth: 1,
        height: 60,
        fontSize: 16,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        ...containerStyle,
      } as ViewStyle,
      textInput: {
        fontSize: 16,
        flex: 1,
        paddingHorizontal: 20,
      },
    };

    // ---> Animations
    const deleteButtonAnimationProgress = useSharedValue(text === "" ? 0 : 1);
    const placeholderAnimationProgress = useSharedValue(text === "" ? 0 : 1);

    useEffect(() => {
      deleteButtonAnimationProgress.value = withTiming(text === "" ? 0 : 1);
      placeholderAnimationProgress.value = withDelay(
        20,
        withTiming(text === "" && !isFocused ? 0 : 1, { duration: 350 })
      );
    }, [isFocused, text]);

    // ---> Functions
    const focusInput = () => {
      // @ts-ignore
      inputRef?.current?.focus();
    };
    const handlePressDelete = () => {
      handleChangeText("");
      // @ts-ignore
      inputRef?.current?.focus();
    };
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    const handleChangeText = (text: string) => {
      setText(text);
      onChangeText?.(text);
    };

    return (
      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={styles.container}>
          <TextInput
            {...rest}
            placeholder="" // force native placeholder to be empty string
            style={[styles.textInput, style]}
            ref={inputRef}
            value={text}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <DeleteButton
            {...{
              handlePressDelete,
              deleteIconColor,
              deleteButtonAnimationProgress,
            }}
          />
          <Placeholder
            {...{
              placeholder,
              placeholderTextColor,
              placeholderTextStyle,
              placeholderAnimationProgress,
              backgroundColor,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const DeleteButton = ({
  deleteButtonAnimationProgress,
  deleteIconColor,
  handlePressDelete,
}: DeleteButtonProps) => {
  const style = useAnimatedStyle(() => ({
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
  }));

  return (
    <TouchableWithoutFeedback onPress={handlePressDelete}>
      <Animated.View style={style}>
        <AnimatedIcon
          name="circle-with-cross"
          size={24}
          color={deleteIconColor}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const Placeholder = ({
  placeholder,
  placeholderTextColor,
  placeholderTextStyle,
  placeholderAnimationProgress,
  backgroundColor,
}: PlaceholderProps) => {
  const styles = {
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
            [0.765, -28]
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
        [15.5, 11]
      ),
      ...placeholderTextStyle,
    })),
  };

  return (
    <>
      {placeholder && placeholder !== "" ? (
        <Animated.View style={styles.placeholderContainerStyle}>
          <Animated.Text style={styles.placeholderStyle}>
            {placeholder}
          </Animated.Text>
        </Animated.View>
      ) : (
        <></>
      )}
    </>
  );
};

export default AnimatedTextInput;
