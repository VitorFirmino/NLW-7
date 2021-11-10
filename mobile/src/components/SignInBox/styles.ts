import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
//import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: getBottomSpace() + 32
  },
  button: {

  },
  title: {
    
  }
});