import { useTheme } from "@/contexts/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, TextInput, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { Product } from "../types/product";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSelectSuggestion: (product: Product) => void;
  suggestions: Product[];
  showSuggestions: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isExpanded?: boolean;
  setIsExpanded?: (isExpanded: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSelectSuggestion,
  suggestions,
  showSuggestions,
  onFocus,
  onBlur,
  isExpanded = false,
  setIsExpanded = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  const handleSearchPress = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      onBlur();
      if (!value) {
        setIsExpanded(false);
      }
    }, 200);
  };

  return (
    <ThemedView
      style={[styles.container, isExpanded && styles.containerExpanded]}
    >
      <ThemedView style={[styles.searchContainer, {}]}>
        <AntDesign
          name="search1"
          size={ms(20)}
          color={colors.icon}
          style={styles.icon}
          onPress={handleSearchPress}
        />
        <TextInput
          ref={inputRef}
          style={[styles.input, { color: colors.text }]}
          placeholder="Search products..."
          placeholderTextColor={colors.placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {value ? (
          <TouchableOpacity onPress={() => onChangeText("")}>
            <AntDesign name="closecircle" size={ms(18)} color={colors.icon} />
          </TouchableOpacity>
        ) : null}
      </ThemedView>

      {showSuggestions && isFocused && suggestions.length > 0 && (
        <ThemedView style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => onSelectSuggestion(item)}
              >
                <ThemedText style={styles.suggestionText} numberOfLines={1}>
                  {item.title}
                </ThemedText>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="always"
            style={styles.suggestionsList}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: "relative",
    zIndex: 10,
    marginRight: 10,
    backgroundColor: "transparent",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: "60%", // Default width
    transition: "max-width 0.3s ease", // Smooth transition
  },
  containerExpanded: {
    maxWidth: "100%", // Full width when expanded
    marginRight: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "25@ms",
    paddingHorizontal: "15@ms",
    height: "35@vs",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: "14@ms", 
  },
  suggestionsContainer: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  suggestionsList: {
    borderRadius: 8,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  suggestionText: {
    fontSize: "14@ms",
  },
});

export default SearchBar;
