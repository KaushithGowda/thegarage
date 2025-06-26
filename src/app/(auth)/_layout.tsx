import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground, useColorScheme } from 'react-native'

export default function AuthLayout() {
  return (
    <ImageBackground
      source={
        'dark' === 'dark'
          ? require('@/src/assests/auth-bg.png')
          : require('@/src/assests/auth-bg.png')
      }
      className='flex-1'
      resizeMode='cover'
    >
      <SafeAreaView
        className={`flex-1 ${'dark' === 'dark' ? 'bg-black/80' : 'bg-white/50'}`}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
              paddingHorizontal: 24,
            },
            // animation: 'fade',
          }}
        >
          <Stack.Screen name='login' />
          <Stack.Screen name='register' />
        </Stack>
      </SafeAreaView>
    </ImageBackground>
  )
}
