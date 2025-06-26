import '@/src/styles/global.css'
import { Slot } from 'expo-router'
import { Provider } from '@/providers'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Layout() {
  return (
    <Provider>
      <SafeAreaView className='flex-1'>
        <Slot />
      </SafeAreaView>
    </Provider>
  )
}
