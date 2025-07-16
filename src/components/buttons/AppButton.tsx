import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from '../texts/AppText';
import { s, vs } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';

type AppButtonProps = {
  onPress: () => void;
  title?: string;
  style?: object;
  styleTitle?: object;
  backgroundColor?: string;
  textColor?: string;
};

const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  style,
  styleTitle,
  backgroundColor = AppColors.Button,
  textColor = AppColors.White,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={
        [
        styles.button,
        {backgroundColor: backgroundColor }
      ]
    }
    >
      <AppText style={[styles.textTitle,{color:textColor}]}  variant='bold'>{title}</AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: vs(50),           // hauteur fixe raisonnable
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(25),
    alignSelf: 'center',
    // paddingVertical: s(10), // facultatif ou à enlever
  },
  textTitle: {
    fontSize: s(16),
    
  },
});

