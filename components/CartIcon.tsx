import { useTheme } from "@/contexts/ThemeContext";
import { useCartStore } from "@/store/useCartStore";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";

const CartIcon: React.FC = () => {
  const totalItems = useCartStore((state) => state.totalItems());
  const scaleValue = new Animated.Value(1);
  const { colors } = useTheme();

  useEffect(() => {
    if (totalItems > 0) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [totalItems]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={styles.container}
      >
        <AntDesign name="shoppingcart" size={ms(25)} color={colors.icon} />
        {totalItems > 0 && (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>{totalItems}</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: "relative",
    marginRight: "5@s",
  },
  badge: {
    position: "absolute",
    top: "-5@ms",
    right: "-5@ms",
    backgroundColor: "red",
    borderRadius: "10@ms",
    width: "18@ms",
    height: "18@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: "10@ms",
    fontWeight: "bold",
    color: "white",
  },
});

export default CartIcon;
