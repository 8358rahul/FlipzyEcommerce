import { useTheme } from "@/contexts/ThemeContext";
import { useWishlistStore } from "@/store/useWishlistStore";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { Product } from "../types/product";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const { colors } = useTheme();
  const handleWishlistPress = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() =>
        router.push({
          pathname: "/product-detail",
          params: { product: JSON.stringify(product) },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistPress}
        >
          <AntDesign
            name={isWishlisted ? "heart" : "hearto"}
            size={ms(20)}
            color={isWishlisted ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
      <ThemedView style={styles.details}>
        <ThemedText style={styles.title} numberOfLines={1}>
          {product.title}
        </ThemedText>
        <ThemedText style={[styles.price, { color: colors.primary }]}>
          ${product.price.toFixed(2)}
        </ThemedText>
        <View style={styles.rating}>
          <AntDesign name="star" size={ms(14)} color="#FFD700" />
          <ThemedText style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    margin: "6@ms",
    borderRadius: "10@ms",
    overflow: "hidden",
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wishlistButton: {
    position: "absolute",
    top: "5@ms",
    right: "5@ms",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20@ms",
    padding: "5@ms",
  },
  details: {
    padding: "10@ms",
  },
  title: {
    fontSize: "14@ms",
    fontWeight: "bold",
    marginBottom: "4@vs",
  },
  price: {
    fontSize: "14@ms",
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4@vs",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

export default ProductCard;
