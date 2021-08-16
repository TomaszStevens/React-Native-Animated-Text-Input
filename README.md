# What is this?

A custom react-native animated text-input.

# Installation

`npm i react-native-animated-text-input`

## Example

<img src="example.gif" width="237" height="512"/>

```
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import AnimatedTextInput from "./src/components/AnimatedTextInput";

const lightBlue = "#45A6E5";
const offWhite = "#e1e1e1";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const style = {
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: offWhite,
      paddingTop: 200,
      paddingHorizontal: 30,
    },
  };

  const config = {
    borderColor: lightBlue,
    deleteIconColor: lightBlue,
    backgroundColor: offWhite,
    placeholderTextColor: lightBlue,
    containerStyle: {
      margin: 5,
    },
  };

  return (
    <View style={style.container}>
      <AnimatedTextInput
        {...config}
        placeholder={"Email"}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <AnimatedTextInput
        {...config}
        placeholder={"Password"}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
    </View>
  );
};

export default App;

```

## Options

All options from default react-native TextInput component are inherited (`TextInputProps`).

Additional options (none are required):

- _backgroundColor_ - The color of the background behind the text-input in your app. The placeholder text is wrapped in a background of this colour, which is responsible for creating the effect of 'making room' in the upper-left side of the text-box for said placeholder text, when the text-input is focused. `ColorValue`
- _borderColor_ - The color of the border of the text-input. `ColorValue`
- _deleteIconColor_ - The color of the delete icon. `ColorValue`
- _placeholderTextStyle_ - Style object for the placeholder text. `TextStyle`
- _containerStyle_ - Style object for the container. This property should be used when applying options such as margin/padding/width/height etc, that are intended to alter the size and/or position of the input. `ViewStyle`
