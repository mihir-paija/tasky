import { PixelSize } from "@/constants/size";
import { globalStyles } from "@/styles/globalStyles";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

interface AuthElevatedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const AuthElevatedButton = (props: AuthElevatedButtonProps) => {
  const { title, onPress, disabled = false, loading = false } = props;
  return (
    <Button
      mode="elevated"
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={styles.button}
      labelStyle={styles.title}
      contentStyle={{ }}
    >
      {title}
    </Button>
  );
};

export default AuthElevatedButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: PixelSize.base,
    width: "60%",
  },
  title: {
    fontWeight: "bold",
    fontSize: PixelSize.lg,
    padding: PixelSize.sm,
    marginVertical: PixelSize.xxs,
  },
  
});
