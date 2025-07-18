import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from './src/navigation/MainAppStack';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/Localization/i18n';
import { getLanguage } from './src/Localization/languageStorage';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const savedLang = await getLanguage();
      if (savedLang) {
        await i18n.changeLanguage(savedLang);
      }
      setIsReady(true);
    })();
  }, []);

  if (!isReady) {
    // Tu peux afficher un loader ici si tu veux
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <MainAppStack />
      </NavigationContainer>
      <FlashMessage position="top" />
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
