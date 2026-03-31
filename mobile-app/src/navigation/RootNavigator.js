import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CheckSquare, Calendar, Settings } from 'lucide-react-native';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Tasks') return <CheckSquare color={color} size={size} />;
          if (route.name === 'Calendar') return <Calendar color={color} size={size} />;
          if (route.name === 'Settings') return <Settings color={color} size={size} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerStyle: { backgroundColor: colors.card, elevation: 0, shadowOpacity: 0 },
        headerTitleStyle: { fontWeight: 'bold', color: colors.text },
        tabBarStyle: { borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.card }
      })}
    >
      <Tab.Screen name="Tasks" component={HomeScreen} options={{ title: 'My Tasks' }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Schedule' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
