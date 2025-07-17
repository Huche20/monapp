import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import AppButton from '../buttons/AppButton'
import AppText from '../texts/AppText'
import { s, vs } from 'react-native-size-matters'
import RadioWithTitle from '../inputs/RadioWithTitle'
import { AppColors } from '../../styles/colors'
import { useTranslation } from 'react-i18next'
import { languagesArr } from '../../Localization/languagesList'
import i18n from '../../Localization/i18n'
import { useState } from 'react'

const LanguageBottomSheet = () => {

  const[selectedLang,setSelectedLang]=useState(i18n.language)
  const onLanguagePress=(code:string)=>{
    setSelectedLang(code)
  }

  const handleConfirm=()=>{
    SheetManager.hide("LANG_SHEET")
    i18n.changeLanguage(selectedLang)
  }
  const { t } = useTranslation()
  return (
    <ActionSheet id='LANG_SHEET'>
      <View style={styles.container}>
        <AppText style={styles.title}>{t("Change Language")}</AppText>

        {/* Scrollable language list */}
        <ScrollView style={styles.scrollView}>
          {
                     languagesArr.map((lang)=>(
                      <RadioWithTitle key={lang.code} title={lang.label} selected={selectedLang===lang.code} onPress={()=>onLanguagePress(lang.code)} />
                )
          
                   )
           }
        </ScrollView>

            
        <AppButton title={t("Confirm")} onPress={handleConfirm} />
      </View>
    </ActionSheet>
  )
}

export default LanguageBottomSheet

const styles = StyleSheet.create({
  container: {
    padding: s(20),
    backgroundColor: AppColors.White,
    borderRadius: s(10),
    maxHeight: vs(450), // limite la hauteur totale du bottom sheet
  },
  title: {
    marginBottom: vs(20),
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor:'#363739FF',
    maxHeight: vs(120), // hauteur max pour la liste déroulante
    marginBottom: vs(40),
  },
})
