import assets from "@/assets";
import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const NoDataFound = ({
  onPress,
  containerStyle,
}: {
  onPress?: () => void;
  loading?: boolean;
  containerStyle?: any;
}) => {
  return (
    <ThemedView style={[styles.container, containerStyle]}>
      <Image
        resizeMode="contain"
        style={styles.imgStyle}
        source={assets.images.noDataFound}
      />
      l
      {onPress && (
        <TouchableOpacity style={styles.addToCartButton} onPress={onPress}>
          <ThemedText style={styles.addToCartText}>Refresh</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

export default memo(NoDataFound);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: "300@ms",
    height: "300@ms",
    alignSelf: "center",
    marginTop: "100@ms",
  },
  addToCartButton: {
    backgroundColor: "#2A4BA0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "60%",
  },
  addToCartText: {
    fontSize: "16@ms",
    fontWeight: "bold",
  },
});
