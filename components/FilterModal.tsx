import { useTheme } from '@/contexts/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { ThemedText } from './ThemedText';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onFilterRating: (rating: number) => void;
  onFilterPrice: (minPrice: number, maxPrice: number) => void;
  onResetFilters: () => void; 
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onFilterRating,
  onFilterPrice,
  onResetFilters, 
}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [rating, setRating] = useState(0);

  
 
const handleApplyFilters = () => {
  onFilterPrice(minPrice, maxPrice);
  onFilterRating(rating);
  onClose();
};
  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setRating(0);
    onResetFilters();
    onClose();
  };

  const {colors} = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Filter Products</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={ms(24)} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Price Range</ThemedText>
            <View style={styles.priceRange}>
              <ThemedText>${minPrice.toFixed(2)}</ThemedText>
              <ThemedText> to </ThemedText>
              <ThemedText>${maxPrice.toFixed(2)}</ThemedText>
            </View>
            <View style={styles.sliderContainer}>
              <ThemedText>Min: ${minPrice.toFixed(2)}</ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1000}
                step={10}
                value={minPrice}
                onValueChange={setMinPrice}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.primary}
              />
              <ThemedText>Max: ${maxPrice.toFixed(2)}</ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1000}
                step={10}
                value={maxPrice}
                onValueChange={setMaxPrice}
                minimumTrackTintColor="#2A4BA0"
                maximumTrackTintColor="#d3d3d3"
              />
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Minimum Rating</ThemedText>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <AntDesign
                    name={star <= rating ? 'star' : 'staro'}
                    size={ms(30)}
                    color={star <= rating ? '#FFD700' : '#d3d3d3'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.resetButton]} onPress={handleReset}>
              <ThemedText style={[styles.resetButtonText,{color:colors.primary}]}>Reset Filters</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.applyButton, { backgroundColor: colors.primary }]} onPress={handleApplyFilters}>
              <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: { 
    borderTopLeftRadius: "20@s",
    borderTopRightRadius: "20@s",
    padding: "18@ms",
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: "20@vs",
  },
  title: {
    fontSize: "20@ms",
    fontWeight: 'bold',
  },
  section: {
    marginBottom: "20@vs",
  },
  sectionTitle: {
    fontSize: "16@ms",
    fontWeight: 'bold',
    marginBottom: "10@vs",
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: "10@vs",
  },
  sliderContainer: {
    paddingHorizontal: "10@s",
  },
  slider: {
    width: '100%',
    height: "40@vs",
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: "20@s",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "20@vs",
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#2A4BA0',
    padding: "15@ms",
    borderRadius: "8@ms",
    flex: 1,
    marginRight: "10@s",
    alignItems: 'center',
  },
  resetButtonText: { 
    fontWeight: 'bold',
  },
  applyButton: { 
    padding: "15@ms",
    borderRadius: "8@ms",
    flex: 1,
    alignItems: 'center',
  },
  applyButtonText: { 
    fontWeight: 'bold',
  },
});

export default FilterModal;