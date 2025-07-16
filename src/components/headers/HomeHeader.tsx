import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { AppColors } from '../../styles/colors'
import { IMAGES } from '../../constants/images-paths'
import { vs } from 'react-native-size-matters'
import AppSaveView from '../views/AppSaveView'
import { MaterialIcons } from '@expo/vector-icons'


const HomeHeader = () => {
  return (
    <View style={styles.headerBg} >
      
    <Text style={styles.mainText}>Smart Home {'\n'} Personal Assistant</Text>
    
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.MainBg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: vs(10)
    },
    logo:{
        height: vs(40),
        width: vs(40),
        
    },
     mainText: {
    fontSize: 27,
    color:'#007BFF',
    fontWeight: "bold",
    
    textAlign: "center"},
    headerBg: {
  backgroundColor: '#E0E7ECFF', // bleu-gris pastel doux
  paddingVertical: 25,
  paddingHorizontal: 20,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
  marginBottom: 15,
},


})



