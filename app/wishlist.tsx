import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Product } from '@/types/product';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';

const WishList = () => { 
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const {colors} = useTheme();
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.card }]}
      onPress={() =>router.push({
        pathname:"/product-detail",
        params:{product:JSON.stringify(item)}
      })}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.details}>
        <ThemedText style={styles.title} numberOfLines={2}>{item.title}</ThemedText>
        <ThemedText style={[styles.price, { color: colors.primary }]}>${item.price.toFixed(2)}</ThemedText>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromWishlist(item.id)}
      >
        <AntDesign name="close" size={ms(20)} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AntDesign name="hearto" size={ms(50)} color={colors.icon} />
          <ThemedText style={styles.emptyText}>Your wishlist is empty</ThemedText>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: "18@ms",
    color: '#666',
    marginTop: "10@vs",
  },
  list: {
    padding: "10@ms",
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: "8@ms",
    padding: "10@ms",
    marginBottom: "10@ms",
    alignItems: 'center',
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
    marginBottom: "5@vs",
  },
  price: {
    fontSize: "16@ms",
    fontWeight: 'bold',
    color: '#2A4BA0',
  },
  removeButton: {
    padding: "5@ms",
  },
});

export default WishList;