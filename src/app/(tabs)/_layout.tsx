import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Animated, View, Text } from 'react-native'

import Chat from '@/src/app/(tabs)/chat'
import Health from '@/src/app/(tabs)/health'
import Forum from '@/src/app/(tabs)/forum'
import Maps from '@/src/app/(tabs)/maps'
import Blogs from '@/src/app/(tabs)/blogs'
import Profile from '@/src/app/(tabs)/profile'
import { usePreferenceStore } from '@/store/usePreferenceStore'

const unreadCount = 1

const Tab = createBottomTabNavigator()

const TabIcon = ({
  iconName,
  focused,
  size,
}: {
  iconName: keyof typeof Ionicons.glyphMap
  focused: boolean
  size: number
}) => {
  const mode = usePreferenceStore((s) => s.mode)
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.7,
      useNativeDriver: true,
      stiffness: 200,
      damping: 10,
    }).start()
  }, [focused])

  return (
    <Animated.View
      className={`items-center justify-center rounded-xl w-12 h-12 ${focused && 'bg-background-200 text-typography-0'}`}
      style={{ transform: [{ scale }] }}
    >
      <Ionicons
        name={iconName}
        size={size}
        color={mode === 'light' ? '#000' : '#fff'}
      />
      <Text
        className={`text-xs mt-1 text-typography-900
        `}
      >
        {(() => {
          switch (iconName) {
            case 'heart':
              return 'Health'
            case 'chatbubbles':
              return 'Chat'
            case 'people':
              return 'Forum'
            case 'map':
              return 'Maps'
            case 'book':
              return 'Blogs'
            case 'person':
              return 'Profile'
            default:
              return 'Tab'
          }
        })()}
      </Text>
    </Animated.View>
  )
}

export default function TabsLayout() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'help-circle'
        switch (route.name) {
          case 'Health':
            iconName = 'heart'
            break
          case 'Chat':
            iconName = 'chatbubbles'
            break
          case 'Forum':
            iconName = 'people'
            break
          case 'Maps':
            iconName = 'map'
            break
          case 'Blogs':
            iconName = 'book'
            break
          case 'Profile':
            iconName = 'person'
            break
        }

        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'text-typography-0',
          tabBarInactiveTintColor: 'text-typography-0',
          tabBarStyle: {
            backgroundColor: 'bg-background-0',
            position: 'absolute',
            height: 70,
            paddingTop: 15,
            paddingHorizontal: 10,
          },
          animation: 'fade',
          freezeOnBlur: true,
          tabBarPosition: 'bottom',
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={iconName} focused={focused} size={20} />
          ),
        }
      }}
    >
      <Tab.Screen name='Health' component={Health} />
      <Tab.Screen name='Chat' component={Chat} />
      <Tab.Screen name='Forum' component={Forum} />
      <Tab.Screen
        name='Maps'
        component={Maps}
        options={{
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tab.Screen name='Blogs' component={Blogs} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}
