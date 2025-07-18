import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import AppButton from '../buttons/AppButton';
import AppText from '../texts/AppText';
import { s, vs } from 'react-native-size-matters';
import RadioWithTitle from '../inputs/RadioWithTitle';
import { AppColors } from '../../styles/colors';
import { useTranslation } from 'react-i18next';
import { languagesArr } from '../../Localization/languagesList';
import i18n from '../../Localization/i18n';
import { saveLanguage } from '../../Localization/languageStorage';

const LanguageBottomSheet = () => {
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');
  const { t } = useTranslation();

  const onLanguagePress = (code: string) => {
    setSelectedLang(code);
  };

  const handleConfirm = async () => {
    SheetManager.hide("LANG_SHEET");
    await i18n.changeLanguage(selectedLang);
    await saveLanguage(selectedLang); // Sauvegarde dans AsyncStorage
  };

  return (
    <ActionSheet id="LANG_SHEET">
      <View style={styles.container}>
        <AppText style={styles.title}>{t("Change Language")}</AppText>

        <ScrollView style={styles.scrollView}>
          {languagesArr.map((lang) => (
            <RadioWithTitle
              key={lang.code}
              title={lang.label}
              selected={selectedLang === lang.code}
              onPress={() => onLanguagePress(lang.code)}
            />
          ))}
        </ScrollView>

        <AppButton title={t("Confirm")} onPress={handleConfirm} />
      </View>
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: s(20),
    backgroundColor: AppColors.White,
    borderRadius: s(10),
    maxHeight: vs(450),
  },
  title: {
    marginBottom: vs(20),
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: '#363739FF',
    maxHeight: vs(120),
    marginBottom: vs(40),
  },
});
