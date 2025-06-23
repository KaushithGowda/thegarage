import { ReactNode } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'
import { ToastProvider } from './toast-provider'

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ToastProvider />
      {children}
    </ReactQueryProvider>
  )
}
