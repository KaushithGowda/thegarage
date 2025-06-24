import { ReactNode } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'
import { ToastProvider } from './toast-provider'
import { GlueStackUiProvider } from './GlueStackUiProvider'

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <GlueStackUiProvider>
        <ToastProvider />
        {children}
      </GlueStackUiProvider>
    </ReactQueryProvider>
  )
}
