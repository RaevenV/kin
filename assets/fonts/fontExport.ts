import * as Font from "expo-font";

const useCustomFonts = async () => {
  await Font.loadAsync({
    "Nunito-Variable": require("./Nunito-VariableFont_wght.ttf"),
    "Rubik-Variable": require("./Rubik-VariableFont_wght.ttf"),
  });
};

export default useCustomFonts;
