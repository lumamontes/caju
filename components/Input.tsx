import { TextInput, TextInputProps, StyleSheet } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={"gray"}
      keyboardType="numeric"
      style={styles.input}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 56, 
    padding: 16,
    fontSize: 16,
  },
});