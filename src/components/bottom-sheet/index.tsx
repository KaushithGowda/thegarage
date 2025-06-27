import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  View,
  StyleSheet,
} from 'react-native'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type BottomSheetRef = {
  present: () => void
  dismiss: () => void
} | null

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  snapPoints?: (string | number)[]
  children: ReactNode
  bgColor?: string
  showCloseButton?: boolean
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    { 
      isOpen, 
      onClose, 
      children, 
      snapPoints = ['70%'], 
      bgColor = '#fff',
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const insets = useSafeAreaInsets()

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetRef.current?.present(),
      dismiss: () => bottomSheetRef.current?.dismiss(),
    }))

    useEffect(() => {
      if (isOpen) {
        bottomSheetRef.current?.present()
      } else {
        bottomSheetRef.current?.dismiss()
      }
    }, [isOpen])

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        {/* Backdrop that closes on tap outside */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose
            onDismiss={onClose}
            backgroundStyle={{
              borderRadius: 24,
              backgroundColor: bgColor,
            }}
            handleIndicatorStyle={{
              backgroundColor: '#d1d5db',
            }}
          > 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <BottomSheetView
                style={{
                  flex: 1,
                  paddingBottom: insets.bottom + 16,
                }}
              >
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                  style={{ flex: 1 }}
                >
                  {children}
                </KeyboardAvoidingView>
              </BottomSheetView>
            </TouchableWithoutFeedback>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Modal>
    )
  }
)

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
})

BottomSheet.displayName = 'BottomSheet'