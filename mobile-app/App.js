import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CheckSquare, Calendar, Settings } from 'lucide-react-native';

// Import all screens correctly
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Tasks') return <CheckSquare color={color} size={size} />;
            if (route.name === 'Calendar') return <Calendar color={color} size={size} />;
            if (route.name === 'Settings') return <Settings color={color} size={size} />;
          },
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#94A3B8',
          headerStyle: { backgroundColor: '#FFFFFF', elevation: 0, shadowOpacity: 0 },
          headerTitleStyle: { fontWeight: 'bold', color: '#0F172A' },
          tabBarStyle: { borderTopWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }
        })}
      >
        <Tab.Screen name="Tasks" component={HomeScreen} options={{ title: 'My Tasks' }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Schedule' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
