import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useAuthContext } from "@/contexts/authContext";

export default function Index() {
  const router = useRouter();
  const { user, authLoading } = useAuthContext();

  useEffect(() => {
    if (authLoading) return; // wait for auth to initialize
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [user, authLoading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
