import { ReactNode } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'
import { ToastProvider } from './toast-provider'
import { GlueStackUiProvider } from './GlueStackUiProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <GlueStackUiProvider>
        <ReactQueryProvider>
          <ToastProvider />
          {children}
        </ReactQueryProvider>
      </GlueStackUiProvider>
    </GestureHandlerRootView>
  )
}
