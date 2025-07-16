import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from './src/navigation/MainAppStack';
import React from 'react';
import i18n from './src/Localization/i18n';
import { I18nextProvider } from 'react-i18next';
export default function App() {
  return (
    <>

      
   <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <MainAppStack />
      </NavigationContainer>
      <FlashMessage position="top" />
  </I18nextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
