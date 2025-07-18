import { StyleSheet, View, Alert, ActivityIndicator, Animated } from 'react-native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import LanguageBottomSheet from '../../components/language/LanguageBottomSheet';
import { useTranslation } from 'react-i18next';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 🔁 Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      const user = auth.currentUser;
      if (user) {
        setIsLoading(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();

        user.reload().then(() => {
          const updatedUser = auth.currentUser;
          setUserName(updatedUser?.displayName || updatedUser?.email || 'User');

          // Fade-out après 1 sec
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => setIsLoading(false));
          }, 1000);
        }).catch(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsLoading(false));
        });
      }
    }, [refreshKey])
  );

  const handleLogout = () => {
    Alert.alert(
      t('Confirm Logout'),
      t('Are you sure you want to logout?'),
      [
        { text: t('No'), style: 'cancel' },
        {
          text: t('Yes'),
          onPress: async () => {
            try {
              await signOut(auth);
              showMessage({
                type: 'success',
                message: t('Logout successful'),
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

  const handleAppRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <AppSaveView style={styles.container}>
      <HomeHeader />

      <View key={refreshKey} style={{ flex: 1 }}>
        <AppText style={styles.welcomeText}>
          {t('👋 Hello')}, {userName}
        </AppText>

        <View style={styles.buttonsContainer}>
          <ProfileSectionButton
            title={t('✏️  Edit Username')}
            onPress={() => navigation.navigate('EditProfileScreen')}
            disabled={isLoading}
          />

          <ProfileSectionButton
            title={t('🌍  Language')}
            onPress={() => SheetManager.show('LANG_SHEET')}
            disabled={isLoading}
          />

          <LanguageBottomSheet />

          <ProfileSectionButton
            title={t('🚪 Logout')}
            onPress={handleLogout}
            disabled={isLoading}
          />

          <ProfileSectionButton
            title="🔄 Refresh Screen"
            onPress={handleAppRefresh}
            disabled={isLoading}
          />
        </View>

        {/* 🔄 Overlay semi-transparent + animation fade */}
        {isLoading && (
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <ActivityIndicator size="large" color="#fff" />
            <AppText style={styles.loadingText}>{t('Mise à jour en cours…')}</AppText>
          </Animated.View>
        )}
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
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: vs(25),
    paddingHorizontal: sharedPaddingHorizontal,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // ← Semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: vs(10),
    fontSize: s(16),
    color: '#fff',
    fontWeight: '500',
  },
});
