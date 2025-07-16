import { ActionSheetIOS, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import AppButton from '../buttons/AppButton'
import AppText from '../texts/AppText'
import { s ,vs} from 'react-native-size-matters'
import RadioWithTitle from '../inputs/RadioWithTitle'
import { AppColors } from '../../styles/colors'

const LanguageBottomSheet = () => {
  return (
    <ActionSheet id='LANG_SHEET'>
        <View style={styles.container}>
        <AppText style={{marginBottom:vs(20),textAlign:"center"}}>Change Language</AppText>
        <RadioWithTitle title="English" selected={true}/>
        <RadioWithTitle title="Türkçe" selected={false}/>
        <RadioWithTitle title="Français" selected={false}/>
        <RadioWithTitle title="Espagnol" selected={false}/>
        <AppButton title='Confirm' onPress={()=> {}}/>

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
    }
})