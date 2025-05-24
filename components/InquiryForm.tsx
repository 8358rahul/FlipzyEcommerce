import { useTheme } from "@/contexts/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";

interface InquiryFormProps {
  productId: number;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ productId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { colors } = useTheme();

  const onSubmit = (data: FormData) => {
    console.log("Inquiry submitted:", { ...data, productId });
    Alert.alert(
      "Inquiry Submitted",
      "Thank you for your inquiry. We will get back to you soon.",
      [
        {
          text: "OK",
          onPress: () => reset(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.card }]}
    >
      <ThemedText style={[styles.title, { color: colors.primary }]}>
        Have a Question?
      </ThemedText>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Name</ThemedText>
        <Controller
          control={control}
          rules={{
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name should be at least 2 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.name && styles.errorInput,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              placeholderTextColor={colors.placeholderTextColor}
              placeholder="Your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <ThemedText style={styles.errorText}>
            {errors.name.message}
          </ThemedText>
        )}
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <Controller
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.name && styles.errorInput,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              placeholderTextColor={colors.placeholderTextColor}
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <ThemedText style={styles.errorText}>
            {errors.email.message}
          </ThemedText>
        )}
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Message</ThemedText>
        <Controller
          control={control}
          rules={{
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message should be at least 10 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                styles.messageInput,
                errors.message && styles.errorInput,
                ,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              placeholderTextColor={colors.placeholderTextColor}
              placeholder="Your question about this product"
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="message"
        />
        {errors.message && (
          <ThemedText style={styles.errorText}>
            {errors.message.message}
          </ThemedText>
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit(onSubmit)}
      >
        <ThemedText style={styles.submitButtonText}>Submit Inquiry</ThemedText>
        <AntDesign name="arrowright" size={ms(20)} color={colors.text} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: "20@vs",
    borderRadius: "10@ms",
    padding: "15@ms",
  },
  title: {
    fontSize: "18@ms",
    fontWeight: "bold",
    marginBottom: "15@vs",
  },
  inputContainer: {
    marginBottom: "15@vs",
  },
  label: {
    fontSize: "14@ms",
    marginBottom: "5@vs",
  },
  input: {
    borderWidth: 1,
    borderRadius: "8@ms",
    padding: "12@ms",
    fontSize: "16@ms",
  },
  messageInput: {
    height: "100@vs",
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: "12@ms",
    marginTop: "5@vs",
  },
  submitButton: {
    backgroundColor: "#2A4BA0",
    padding: "15@ms",
    borderRadius: "8@ms",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: "16@ms",
    fontWeight: "bold",
    marginRight: "10@s",
  },
});

export default InquiryForm;
