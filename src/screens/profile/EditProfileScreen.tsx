import { StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import AppSaveView from '../../components/views/AppSaveView';
import AppTextInput from '../../components/inputs/AppTextInput';
import AppButton from '../../components/buttons/AppButton';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { updateProfile } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { sharedPaddingHorizontal } from '../../styles/SharedStyles';
import { AppColors } from '../../styles/colors';
import { useTranslation } from 'react-i18next';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const currentUser = auth.currentUser;
  const [name, setName] = useState(currentUser?.displayName || '');
  const {t}=useTranslation()
  const handleSave = async () => {
    try {
      if (currentUser) {
        await updateProfile(currentUser, { displayName: name });
        
        showMessage({
          message: t('Name updated successfully!'),
          type: 'success',
          backgroundColor: '#28a745',
          color: 'white',
        });

        navigation.goBack();
      }
    } catch (error) {
      console.log('Update profile error:', error);
      showMessage({
        message: t('Failed to update name. Try again.'),
        type: 'danger',
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Text style={styles.title}>{t("Edit Your Username")}</Text>
      <AppTextInput placeholder={t("Your Username")} value={name} onChangeText={setName} />
      <AppButton
        title={t("Save")}
        onPress={handleSave}
        style={styles.button}
        textColor={AppColors.pembe}
      />
    </AppSaveView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sharedPaddingHorizontal,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#007BFF',
  },
  button: {
    marginTop: 20,
  },
});
