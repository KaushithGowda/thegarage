import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'maps':
              iconName = focused ? 'map' : 'map-outline'
              break
            case 'forum':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
              break
            case 'blogs':
              iconName = focused ? 'book' : 'book-outline'
              break
            case 'profile':
              iconName = focused ? 'person' : 'person-outline'
              break
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="forum" options={{ title: 'Forum' }} />
      <Tabs.Screen name="maps" options={{ title: 'Map' }} />
      <Tabs.Screen name="blogs" options={{ title: 'Blogs' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}