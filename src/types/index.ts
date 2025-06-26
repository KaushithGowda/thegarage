import { TextInputProps } from "react-native";

// Input field type
export type InputFieldRef = React.Ref<TextInputProps>

export type Mode = 'light' | 'dark'

export interface PreferenceStore {
  mode: 'light' | 'dark'
  hasHydrated: boolean
  toggleMode: () => void
  setHasHydrated: (value: boolean) => void
}