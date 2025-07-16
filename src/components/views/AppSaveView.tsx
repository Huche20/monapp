// src/components/views/AppSaveView.tsx
import {
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { AppColors } from "../../styles/colors";
import { IS_Android } from "../../constants/constant";

export interface AppSaveViewProps {
  style?: object;
  children?: React.ReactNode;
}

const AppSaveView: FC<AppSaveViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AppSaveView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.MainBg,
    paddingTop: IS_Android ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
  },
});
