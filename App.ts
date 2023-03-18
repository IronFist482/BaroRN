import "react-native-gesture-handler";
import { LogBox, Text } from "react-native";
import { enableScreens } from "react-native-screens";

import App from "@navigation/index";

enableScreens();
LogBox.ignoreAllLogs();

export default App;
