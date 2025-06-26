import { Text } from '@/src/components/ui/text'
import { VStack } from '@/src/components/ui/vstack'

const ComingSoon = ({ pagename }: { pagename: string }) => {
  return (
    <VStack className='flex-1 items-center justify-center space-y-3'>
      <Text className='text-4xl'>🚧</Text>
      <Text className='text-xl font-bold text-typography-800 capitalize'>
        {pagename} coming soon!
      </Text>
      <Text className='text-sm text-center text-typography-500 max-w-xs'>
        We're working hard to bring this feature to life. Stay tuned for updates!
      </Text>
    </VStack>
  )
}

export default ComingSoon
