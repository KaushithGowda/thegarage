import React from 'react'
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export const GlueStackUiProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <GluestackUIProvider>{children}</GluestackUIProvider>
}
