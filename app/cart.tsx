import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/contexts/ThemeContext";
import { useCartStore } from "@/store/useCartStore";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { CartItem } from "../types/product";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCartStore();

  const onSubmit = () => {
    clearCart();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `Order placed successfully`,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });
  };
  const { colors } = useTheme();
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.item, { backgroundColor: colors.card }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {item.title}
        </ThemedText>
        <ThemedText style={[styles.price, { color: colors.primary }]}>
          ${item.price.toFixed(2)}
        </ThemedText>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <AntDesign name="minuscircleo" size={ms(20)} color={colors.icon} />
          </TouchableOpacity>
          <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <AntDesign name="pluscircleo" size={ms(20)} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <AntDesign name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AntDesign name="shoppingcart" size={ms(50)} color={colors.icon} />
          <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={[styles.list, {}]}
          />
          <View
            style={[
              styles.summary,
              { backgroundColor: colors.card, borderTopColor: colors.border },
            ]}
          >
            <ThemedText style={styles.total}>
              Total: ${totalPrice().toFixed(2)}
            </ThemedText>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={onSubmit}
            >
              <ThemedText style={styles.checkoutText}>Checkout</ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: "18@ms",
    marginTop: "10@vs",
  },
  list: {
    padding: "10@ms",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: "8@ms",
    padding: "10@ms",
    marginBottom: "10@vs",
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: "60@ms",
    height: "60@ms",
    marginRight: "10@s",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: "16@ms",
    marginBottom: "5@s",
  },
  price: {
    fontSize: "16@ms",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5@vs",
  },
  quantity: {
    marginHorizontal: "10@ms",
    fontSize: "16@ms",
  },
  removeButton: {
    padding: "5@ms",
  },
  summary: {
    padding: "15@ms",
    borderTopWidth: 1,
  },
  total: {
    fontSize: "18@ms",
    fontWeight: "bold",
    marginBottom: "10@vs",
    textAlign: "center",
  },
  checkoutButton: {
    padding: "15@ms",
    borderRadius: "8@ms",
    alignItems: "center",
  },
  checkoutText: {
    fontSize: "18@ms",
    fontWeight: "bold",
  },
});

export default Cart;
