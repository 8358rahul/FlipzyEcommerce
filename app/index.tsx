import CartIcon from "@/components/CartIcon";
import FilterModal from "@/components/FilterModal";
import NoDataFound from "@/components/NoDataFound";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import useProducts from "@/hooks/useProducts";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "@/types/product";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

const ProductList = () => {
  const {
    products,
    loading,
    error,
    searchProducts,
    filterByRating,
    filterByPrice,
    resetFilters,
    activeFilters,
    fetchProducts,
  } = useProducts();
  const { colors } = useTheme();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show top 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // searchProducts(query);
  };

  const handleSelectSuggestion = (product: Product) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    router.push({
      pathname: "/product-detail",
      params: { product: JSON.stringify(product) },
    });
    setSearchQuery("");
    resetFilters();
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        {!isSearchFocused && <ThemeToggle />}
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onSelectSuggestion={handleSelectSuggestion}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onFocus={() => {
            setShowSuggestions(true);
            setIsSearchFocused(true);
          }}
          onBlur={() => {
            setShowSuggestions(false);
            setIsSearchFocused(false);
          }}
          isExpanded={isSearchFocused}
          setIsExpanded={setIsSearchFocused}
        />

        {!isSearchFocused && (
          <>
            <TouchableOpacity
              onPress={() => setShowFilters(true)}
              style={styles.filterButton}
            >
              <AntDesign name="filter" size={ms(25)} color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/wishlist")}
              style={styles.wishlistButton}
            >
              <AntDesign name="heart" size={ms(25)} color="red" />
              {wishlist.length > 0 && (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    {wishlist.length}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
            <CartIcon />
          </>
        )}
      </View>
      <View style={styles.activeFiltersContainer}>
        {(activeFilters.minRating > 0 ||
          activeFilters.minPrice > 0 ||
          activeFilters.maxPrice < 1000 ||
          activeFilters.searchQuery) && (
          <TouchableOpacity
            onPress={resetFilters}
            style={styles.clearAllButton}
          >
            <ThemedText style={styles.clearAllText}>Clear Filter</ThemedText>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <NoDataFound
            onPress={() => {
              if (error) {
                fetchProducts();
              }
              setSearchQuery("");
              resetFilters();
            }}
          />
        }
        refreshing={refreshing}
        onRefresh={() => fetchProducts()}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onFilterRating={filterByRating}
        onFilterPrice={filterByPrice}
        onResetFilters={resetFilters}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  wishlistButton: {
    position: "relative",
    marginRight: "10@s",
  },
  badge: {
    position: "absolute",
    top: "-5@vs",
    right: "-5@s",
    backgroundColor: "red",
    borderRadius: 10,
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
  list: {
    padding: "8@ms",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: "5@ms",
    elevation: 3,
    zIndex: 10,
  },
  filterButton: {
    marginLeft: "10@s",
    padding: "5@ms",
  },
  activeFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A4BA0",
    borderRadius: "15@ms",
    paddingVertical: "6@vs",
    paddingHorizontal: "10@ms",
    width: "100@s",
  },

  activeFiltersContainer: {
    alignItems: "center",
  },
  clearAllButton: {
    paddingVertical: "5@vs",
    paddingHorizontal: "10@ms",
    borderRadius: "15@ms",
    borderWidth: 0.5,
    borderColor: "#2A4BA0",
    marginTop: "10@vs",
  },
  clearAllText: {
    fontSize: "14@ms",
    fontWeight: "bold",
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    maxWidth: "60%", // Default width
  },
  searchBarExpanded: {
    maxWidth: "100%", // Full width when focused
    marginHorizontal: 0,
  },
});

export default ProductList;
