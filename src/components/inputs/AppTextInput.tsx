import { StyleSheet, Text, View,TextInput,TextStyle } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import { FC } from 'react'



interface AppTextInputProps {
  value: string;
  style?: TextStyle; 
  keyboardType?: "default" | "numeric" | "email-address" ;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const AppTextInput: FC <AppTextInputProps> = ({
    value,
    style,
    keyboardType,
    secureTextEntry,
    onChangeText,
    placeholder,
}) => {
  return (
    <TextInput
    
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    style={[styles.input,style]}
    />
  );
};

export default AppTextInput

const styles = StyleSheet.create({
input: {
  
    width: "100%",
    height: vs(50),
    borderRadius: s(30),
    borderWidth: s(2),
    borderColor: AppColors.borderColors,
    paddingHorizontal: s(25),
    fontSize: s(16),
    backgroundColor: AppColors.PlaceholderText,
    
    marginBottom: vs(14)
}
})