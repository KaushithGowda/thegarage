import { Animated, ScrollView, View } from 'react-native'
import { useCallback, useRef } from 'react'
import { useFocusEffect } from 'expo-router'
import { usePreferenceStore } from '@/store/usePreferenceStore'

function ScreenTransition({ children }: { children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.95)).current
  const mode = usePreferenceStore((s) => s.mode)

  useFocusEffect(
    useCallback(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start()

      return () => {
        opacity.setValue(0)
        scale.setValue(0.95)
      }
    }, [])
  )

  return (
    <View
      className={`flex-1 ${mode === 'dark' ? 'bg-background-dark' : 'bg-background-0'}`}
    >
      <Animated.View
        className={'flex-1'}
        style={{ opacity, transform: [{ scale }] }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}>
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  )
}

export default ScreenTransition
