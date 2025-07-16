import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';


type Props = {
  deviceStates: {
    light: boolean;
    fan: boolean;
    thermostat: boolean;
  };
  setDeviceStates: React.Dispatch<
    React.SetStateAction<{
      light: boolean;
      fan: boolean;
      thermostat: boolean;
    }>
  >;
};

const HomeDevicesButtons: React.FC<Props> = ({ deviceStates, setDeviceStates }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{t("Control Devices")}</Text>
    
      <View style={styles.deviceRow}>
        <MaterialCommunityIcons
          name="lightbulb"
          size={24}
          color={deviceStates.light ? '#FFD700' : '#555'}
        />
        <Text style={styles.label}>{t("Light")}</Text>
        <Switch
          value={deviceStates.light}
          onValueChange={() =>
            setDeviceStates({ ...deviceStates, light: !deviceStates.light })
          }
        />
      </View>

      <View style={styles.deviceRow}>
        <FontAwesome5
          name="fan"
          size={22}
          color={deviceStates.fan ? '#00BFFF' : '#555'}
        />
        <Text style={styles.label}>{t("Fan")}</Text>
        <Switch
          value={deviceStates.fan}
          onValueChange={() =>
            setDeviceStates({ ...deviceStates, fan: !deviceStates.fan })
          }
        />
      </View>

      <View style={styles.deviceRow}>
        <FontAwesome5
          name="thermometer-half"
          size={22}
          color={deviceStates.thermostat ? '#FF6347' : '#555'}
        />
        <Text style={styles.label}>{t("Thermostat")}</Text>
        <Switch
          value={deviceStates.thermostat}
          onValueChange={() =>
            setDeviceStates({ ...deviceStates, thermostat: !deviceStates.thermostat })
          }
        />
      </View>
    </View>
  );
};

export default HomeDevicesButtons;

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 40,
    marginHorizontal: 10,
    marginTop: 60,
    marginBottom: 35,
    elevation: 50,
    
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});
