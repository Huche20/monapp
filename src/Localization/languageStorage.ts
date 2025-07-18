import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'app-language';

export const saveLanguage = async (lang: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  } catch (e) {
    console.log('Error saving language', e);
  }
};

export const getLanguage = async (): Promise<string | null> => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return lang;
  } catch (e) {
    console.log('Error getting language', e);
    return null;
  }
};
