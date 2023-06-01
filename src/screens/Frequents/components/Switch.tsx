import colors from "@utils/colors";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";

const Switch = ({ value, onValueChange }: any) => {
  const [animation] = useState(new Animated.Value(value ? 2.4 : 0));
  const [isEnabled, setIsEnabled] = useState(value);

  const handleSwitch = () => {
    setIsEnabled(!isEnabled);
    Animated.timing(animation, {
      toValue: isEnabled ? 0 : 2.4,
      duration: 400,
      useNativeDriver: false,
    }).start(() => onValueChange(!isEnabled));
  };

  const interpolatedColorAnimation = animation.interpolate({
    inputRange: [0, 2],
    outputRange: ["#dbdbdb", "#2584A0"],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleSwitch}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.toggle,
            {
              backgroundColor: interpolatedColorAnimation,
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 25],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white_1,
    justifyContent: "center",
    paddingHorizontal: 5,
    alignSelf: "center",
    marginTop: 20,
    elevation: 5,
  },
  toggle: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});

export default Switch;
