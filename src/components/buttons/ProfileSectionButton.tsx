import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../texts/AppText';
import { AppColors } from '../../styles/colors';
import { vs, s } from 'react-native-size-matters';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileSectionButton = ({ onPress, title, icon = 'keyboard-arrow-right' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        
        <AppText style={styles.text}>{title}</AppText>
        <MaterialIcons name={icon} size={s(22)} color={AppColors.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSectionButton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: vs(14),
    paddingHorizontal: s(16),
    marginBottom: vs(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    fontSize: s(16),
    color: AppColors.black,
    fontWeight: '500',
    marginLeft: s(10),
  },
});
