import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export const toastConfig = {
  success: ({ text1, text2, props, ...rest }: any) => (
    <View style={styles.successContainer}>
      <View style={styles.iconContainer}>
        <AntDesign name="checkcircle" size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  ),
  error: ({ text1, text2, props, ...rest }: any) => (
    <View style={styles.errorContainer}>
      <View style={styles.iconContainer}>
        <AntDesign name="closecircle" size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4BB543',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3333',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text2: {
    color: 'white',
    fontSize: 14,
    marginTop: 2,
  },
});