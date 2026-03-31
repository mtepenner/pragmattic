import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CheckSquare, Calendar, Settings } from 'lucide-react-native';

// Import our screens
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';

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
          tabBarActiveTintColor: '#3B82F6', // A nice primary blue
          tabBarInactiveTintColor: '#94A3B8',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Tasks" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen 
          name="Settings" 
          component={HomeScreen} // Placeholder until we build SettingsScreen
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
