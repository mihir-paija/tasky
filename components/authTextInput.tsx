import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { PixelSize } from "@/constants/size";

interface AuthTextInputProps extends TextInputProps {
  label: string;
}

const AuthTextInput = (props: AuthTextInputProps) => {
  return <TextInput mode="outlined" style={styles.textInput} {...props} />;
};

export default AuthTextInput;

const styles = StyleSheet.create({
  textInput: {
    marginVertical: PixelSize.sm,
    width: "80%",
  },
});
