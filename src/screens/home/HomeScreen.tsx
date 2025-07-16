import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSaveView from '../../components/views/AppSaveView'
import HomeHeader from '../../components/headers/HomeHeader'
import MicButton from '../../components/headers/MicButton'
import HomeDevicesButtons from './HomeDevicesButtons'
const HomeScreen = () => {
  const [deviceStates, setDeviceStates] = React.useState({});

  return (
    <AppSaveView>
      <HomeHeader/>
      <MicButton/>
      <HomeDevicesButtons deviceStates={deviceStates} setDeviceStates={setDeviceStates}/> 
    </AppSaveView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})