import colors from "@utils/colors";
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const CircleCharge = () => {
  return (
    <Progress.Circle
      indeterminate={true}
      animated={true}
      endAngle={0.7}
      indeterminateAnimationDuration={1000}
      size={70}
      color={colors.white_1}
      borderWidth={5}
      style={{ marginTop: "13%" }}
    />
  );
};

export default CircleCharge;
