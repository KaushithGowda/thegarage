import { View } from "react-native"
import { VStack } from "./ui/vstack"
import { Text } from "./ui/text"

const ComingSoon = ({pagename}: {pagename: string}) => {
  return (
    <VStack className="flex-1 items-center justify-center">
      <Text className='text-lg font-semibold text-typography-700'>
        🚧 {pagename} coming soon!
      </Text>
      <Text className='text-sm text-typography-500 mt-2'>
        We're cooking up some great content for you. Stay tuned.
      </Text>
    </VStack>
  )
}

export default ComingSoon
