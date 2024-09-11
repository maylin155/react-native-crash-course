import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFA001',   // Set active icon and text color to pink
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 2,
            borderTopColor: '#232533',
            height: 84
          } // Set inactive icon and text color to blue
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus-circle" size={24} color={color} />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Saved',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome name="bookmark" size={24} color={color} />
            ),
          }}
        /> */}
      </Tabs>
    </>
  );
}

export default TabsLayout;
