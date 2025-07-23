import { PixelSize } from "@/constants/size";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

interface AuthGoogleButtonProps {
  onPress: () => void;
}

const AuthGoogleButton = (props: AuthGoogleButtonProps) => {
  const { onPress } = props;
  const { dark } = useTheme();
  return (
    <IconButton
      icon="google"
      size={PixelSize.xl}
      onPress={onPress}
      style={{
        marginBottom: PixelSize.sm,
        backgroundColor: dark ? "#ffffff" : "#DB4437", // white for dark, red for light
        borderRadius: PixelSize.xxl, // circular
        padding: PixelSize.xs,
        elevation: PixelSize.xxs,
      }}
      iconColor={dark ? "#DB4437" : "#ffffff"} // red for dark, white for light
    />
  );
};

export default AuthGoogleButton;

const styles = StyleSheet.create({});
