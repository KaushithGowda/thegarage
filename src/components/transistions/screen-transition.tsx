import { Animated } from 'react-native'
import { useCallback, useRef } from 'react'
import { useFocusEffect } from 'expo-router'

function ScreenTransition({ children }: { children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.95)).current

  useFocusEffect(
    useCallback(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
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
    <Animated.View style={{ flex: 1, opacity, transform: [{ scale }] }}>
      {children}
    </Animated.View>
  )
}

export default ScreenTransition