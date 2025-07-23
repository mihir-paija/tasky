import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PixelSize } from "@/constants/size";
import { Link, LinkProps } from "expo-router";

interface AuthTextLinkProps {
  text: string;
  linkText: string;
  href: LinkProps["href"]; 
}

const AuthTextLink: React.FC<AuthTextLinkProps> = ({ text, linkText, href }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
        {text}{" "}
      </Text>
      <Link href={href}>
        <Text
          variant="bodyMedium"
          style={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {linkText}
        </Text>
      </Link>
    </View>
  );
};
export default AuthTextLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: PixelSize.base,
  },
});
