import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import AuthElevatedButton from "../components/authElevatedButton";
import { useState } from "react";
import AuthTextInput from "@/components/authTextInput";
import { useTheme, Text, IconButton } from "react-native-paper";
import AuthTextLink from "@/components/authTextLink";
import { PixelSize } from "@/constants/size";
import AuthGoogleButton from "@/components/authGoogleButton";
import useAuth from "@/hooks/useAuth";
import { useAuthContext } from "@/contexts/authContext";
import { router } from "expo-router";
const Signup = () => {
  const { handleSignUp } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();

  const onSingUp = async () => {
    setLoading(true);
    try {
      await handleSignUp(email, password);
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Signup Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView
        style={{
          ...globalStyles.pageContainer,
          backgroundColor: colors.background,
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...globalStyles.textContainer,
            marginBottom: PixelSize.base,
          }}
        >
          <Text variant="headlineLarge" style={globalStyles.title}>
            Let's Get Started! 🚀
          </Text>
        </View>
        <AuthTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AuthTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AuthElevatedButton
          title="Sign Up"
          onPress={onSingUp}
          loading={loading}
          disabled={loading}
        />
        <View
          style={{
            ...globalStyles.textContainer,
            marginVertical: PixelSize.sm,
          }}
        >
          <Text variant="bodyMedium">or signup with</Text>
        </View>
        <AuthGoogleButton
          onPress={() => console.log("Google signup pressed")}
        />

        <View style={styles.loginLine}>
          <AuthTextLink
            text="Already have an account?"
            linkText="Login"
            href="/login"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  loginLine: {
    position: "absolute",
    bottom: PixelSize.xl,
    alignSelf: "center",
  },
});
