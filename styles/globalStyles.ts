import { PixelSize } from "@/constants/size";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    padding: PixelSize.base,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    width: "100%", 
    justifyContent: "center",
    alignItems: "center",
  }
});
