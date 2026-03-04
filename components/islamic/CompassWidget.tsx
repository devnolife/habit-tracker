import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const COMPASS_SIZE = 328;

interface CompassWidgetProps {
  size?: number;
}

export function CompassWidget({ size = COMPASS_SIZE }: CompassWidgetProps) {
  return (
    <View style={[styles.container, { width: size + 20, height: size + 44 }]}>
      <Image
        source={require("../../assets/images/compass-widget.png")}
        style={[styles.compassImage, { width: size + 20, height: size + 44 }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  compassImage: {
    // The downloaded image is the full compass widget rendered from Figma
  },
});
