import { StyleSheet, View, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import AppSaveView from '../../components/views/AppSaveView';
import HomeHeader from '../../components/headers/HomeHeader';
import ProfileSectionButton from '../../components/buttons/ProfileSectionButton';
import { sharedPaddingHorizontal } from '../../styles/SharedStyles';
import AppText from '../../components/texts/AppText';
import { vs, s } from 'react-native-size-matters';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { AppColors } from '../../styles/colors';
import { SheetManager } from 'react-native-actions-sheet';
import { t } from 'i18next';
import LanguageBottomSheet from '../../components/language/LanguageBottomSheet';
import { useTranslation } from 'react-i18next';



const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const {t}=useTranslation()
 
  useFocusEffect(
    useCallback(() => {
      const user = auth.currentUser;
      if (user) {
        user.reload().then(() => {
          const updatedUser = auth.currentUser;
          setUserName(updatedUser?.displayName || updatedUser?.email || 'User');
        });
      }
    }, [])
  );

  const handleLogout = () => {
    Alert.alert( 
      t('Confirm Logout'),
      t("Are you sure you want to logout?"),
      [
        { text: t('No'), style: t('cancel' )},
        {
          text: t('Yes'),
          onPress: async () => {
            try {
              await signOut(auth);
              showMessage({
                type: 'success',
                message: t("Logout successful"),
                backgroundColor: '#28a745',
                color: '#fff',
              }); 
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }],
              });
            } catch (error) {
              console.log('Logout error:', error);
              Alert.alert('Logout failed', 'Please try again.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <AppSaveView style={styles.container}>
      <HomeHeader />
    
      <AppText style={styles.welcomeText}>
        {t("👋 Hello")}, {userName}
      </AppText>
      
      <View style={styles.buttonsContainer}>
        <ProfileSectionButton
          title={t("✏️  Edit Username")}
          onPress={() => navigation.navigate('EditProfileScreen')}
        />
        <ProfileSectionButton
          title={t("🌍  Language")}
          onPress={() => SheetManager.show("LANG_SHEET")}
        />
        <LanguageBottomSheet />
        <ProfileSectionButton
          title={t("🚪 Logout")}
          onPress={handleLogout}
        />
        
      
      </View>

      
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.MainBg,
  },
  welcomeText: {
    fontSize: s(20),
    marginTop: vs(30),
    
    color: AppColors.icon,
    fontWeight: '600',
  },
  buttonsContainer: {
    marginTop: vs(25),
    paddingHorizontal: sharedPaddingHorizontal,
  },
});
