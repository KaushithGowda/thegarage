import React from 'react'
import { GluestackUIProvider as Provider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

export const GlueStackUiProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <Provider config={config} colorMode='light'>{children}</Provider>
}
