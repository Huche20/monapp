import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{FC} from 'react'
import { s, vs } from 'react-native-size-matters'
import App from '../../../App'  
import { AppColors } from '../../styles/colors'
import AppText from '../texts/AppText'

interface RadioWithTitlePros {
  selected?: boolean;
  title: string;
  onPress?: () => void;
}


const RadioWithTitle :FC<RadioWithTitlePros>= ({selected,title,onPress}) => {
  return (
   <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.circle}>
        {
            selected === true && <View style={styles.innerCircle} />
        }   
    </View>
    <AppText style={styles.title}>{title}</AppText>
   </TouchableOpacity>
  )
}

export default RadioWithTitle

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:vs (5)
    },
    circle: {
        width: s(20),
        height: s(20),
        borderRadius: s(20),
        borderWidth: 2,
        borderColor: "#888887FF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: s(10),
        height: s(10),
        borderRadius: s(100),
        backgroundColor: "#7E7E7CFF",
    },
    title: {
        marginStart: s(10),
        fontSize: s(16),
        color: AppColors.black,
    }
   

})