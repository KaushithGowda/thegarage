import React from 'react'
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { usePreferenceStore } from '@/store/usePreferenceStore';

export const GlueStackUiProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const mode = usePreferenceStore(state => state.mode)

  return <GluestackUIProvider mode={mode}>{children}</GluestackUIProvider>
}
