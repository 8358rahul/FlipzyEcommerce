import CartIcon from "@/components/CartIcon";
import InquiryForm from "@/components/InquiryForm";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/contexts/ThemeContext";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const ProductDetail = () => {
  const data = useLocalSearchParams<{ product: string }>();
  const product = JSON.parse(data?.product);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart } = useCartStore();
  const isWishlisted = isInWishlist(product.id);
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: product.title,
      headerRight: () => <CartIcon />,
    });
  }, [navigation, product.title]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistPress = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.background }}
      keyboardVerticalOffset={Platform.OS === "ios" ? vs(60) : 0} // Adjust if header/navbar is present
    >
      <ScrollView contentContainerStyle={[styles.container]}>
        <View style={{ backgroundColor: "white" }}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.details}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>{product.title}</ThemedText>
            <TouchableOpacity onPress={handleWishlistPress}>
              <AntDesign
                name={isWishlisted ? "heart" : "hearto"}
                size={ms(20)}
                color={isWishlisted ? "red" : colors.icon}
              />
            </TouchableOpacity>
          </View>

          <ThemedText style={[styles.price, { color: colors.primary }]}>
            ${product.price.toFixed(2)}
          </ThemedText>

          <View style={styles.rating}>
            <AntDesign name="star" size={ms(16)} color="#FFD700" />
            <ThemedText style={styles.ratingText}>
              {product.rating.rate} ({product.rating.count} reviews)
            </ThemedText>
          </View>

          <ThemedText style={styles.category}>
            Category: {product.category}
          </ThemedText>

          <ThemedText style={styles.description}>
            {product.description}
          </ThemedText>

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleAddToCart}
          >
            <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
          </TouchableOpacity>

          <InquiryForm productId={product.id} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: "20@vs",
  },
  image: {
    width: "100%",
    height: "300@vs",
  },
  details: {
    padding: "20@ms",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10@vs",
  },
  title: {
    fontSize: "20@ms",
    fontWeight: "bold",
    flex: 1,
    marginRight: "10@ms",
  },
  price: {
    fontSize: "24@ms",
    fontWeight: "bold",
    marginBottom: "10@vs",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10@vs",
  },
  ratingText: {
    marginLeft: "5@ms",
    fontSize: "16@ms",
  },
  category: {
    fontSize: "16@ms",
    marginBottom: 15,
    textTransform: "capitalize",
  },
  description: {
    fontSize: "16@ms",
    lineHeight: "24@vs",
    marginBottom: "20@vs",
  },
  addToCartButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addToCartText: {
    fontSize: "18@ms",
    fontWeight: "bold",
  },
});

export default ProductDetail;
