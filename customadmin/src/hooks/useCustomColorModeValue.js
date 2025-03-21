import {useColorMode} from "Chakra-ui/React";

export const useCustomModeValue = (lightValue, darkValue) => {
    const {colorMode} = useColorMode();
    return colorMode == "light" ? lightValue : darkValue;

};