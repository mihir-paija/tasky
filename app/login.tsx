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
import { useAuthContext } from "@/contexts/authContext";
import { router, useRouter } from "expo-router";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const { handleLogin } = useAuthContext();

  const onLogin = async () => {
    setLoading(true);
    try {
      await handleLogin(email, password);
      router.push("/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Login Failed", errorMessage);
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
            Welcome Back 👋
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
          title="Login"
          onPress={onLogin}
          loading={loading}
          disabled={loading}
        />
        <View
          style={{
            ...globalStyles.textContainer,
            marginVertical: PixelSize.sm,
          }}
        >
          <Text variant="bodyMedium">or login with</Text>
        </View>
        <AuthGoogleButton onPress={() => console.log("Google login pressed")} />

        <View style={styles.signupLine}>
          <AuthTextLink
            text="Don’t have an account?"
            linkText="Sign Up"
            href="/signup"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  signupLine: {
    position: "absolute",
    bottom: PixelSize.xl,
    alignSelf: "center",
  },
});
