import { TextInputProps } from "react-native";

// Input field type
export type InputFieldRef = React.Ref<TextInputProps>

export type Mode = 'light' | 'dark'

export type PreferenceStore = {
  mode: Mode
  toggleMode: () => void
}