import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { useRouter } from 'expo-router'
import { useUserStore } from '@/store/useUserStore'
import { usePreferenceStore } from '@/store/usePreferenceStore'
import { useState } from 'react'
import { useLogout } from '@/hooks/use-logout'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogBody,
} from '@/components/ui/alert-dialog'
import { View } from 'react-native'

const Row = ({
  label,
  value,
  action,
}: {
  label: string
  value?: string
  action?: React.ReactNode
}) => (
  <View className='flex-row justify-between items-center border-b border-typography-200 py-4'>
    <Text className='text-sm text-typography-500'>{label}</Text>
    {value ? (
      <Text className='text-sm font-medium text-typography-900'>{value}</Text>
    ) : (
      action
    )}
  </View>
)

const Profile = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const mode = usePreferenceStore((s) => s.mode)
  const toggle = usePreferenceStore((s) => s.toggleMode)
  const user = useUserStore((s) => s.user)
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const driving = '2y 6m'
  const riding = '1y 8m'

  return (
    <VStack className='flex-1 bg-background px-4 py-5' space='3xl'>
      <VStack space='sm' className='flex flex-row items-center my-5'>
        <View className='w-24 h-24 bg-gray-300 rounded-full' />
        <VStack className='flex flex-col'>
          <Text className='text-xl font-bold text-typography-900'>
            {user?.name || 'User Name'}
          </Text>
          <Text className='text-sm text-typography-500'>
            {user?.name || 'username@email.com'}
          </Text>
        </VStack>
      </VStack>

      <VStack
        space='xs'
        className='bg-white dark:bg-gray-800 rounded-xl px-3 py-3 shadow'
      >
        <Row
          label='Theme'
          action={
            <Button size='sm' variant='outline' onPress={toggle}>
              <ButtonText>
                {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </ButtonText>
            </Button>
          }
        />
        <Row label='Phone Number' value='+xx xxxxx xxxxx' />
        <Row label='Driving Experience' value={driving} />
        <Row label='Riding Experience' value={riding} />
        <Row label='My Vehicles' value='2 vehicles' />
        <Row
          label='Sign Out'
          action={
            <>
              <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => setShowAlertDialog(false)}
                size='md'
              >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <Heading
                      className='text-typography-900 font-semibold'
                      size='md'
                    >
                      Are you sure you want to logout?
                    </Heading>
                  </AlertDialogHeader>
                  <AlertDialogBody className='mt-3 mb-4'>
                    <Text size='sm' className='text-typography-500'>
                      Logging out will sign you out of the app. Please confirm
                      if you want to proceed.
                    </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter className='gap-2'>
                    <Button
                      variant='outline'
                      action='secondary'
                      onPress={() => setShowAlertDialog(false)}
                      size='sm'
                    >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button size='sm' onPress={logout}>
                      <ButtonText>Logout</ButtonText>
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant='solid'
                size='sm'
                onPress={() => setShowAlertDialog(true)}
              >
                <ButtonText>Logout</ButtonText>
              </Button>
            </>
          }
        />
      </VStack>

      <VStack className='items-center pt-6 space-y-1'>
        <Text className='text-xs text-typography-400'>Joined Jan 2024</Text>
        <Text className='text-xs text-typography-400 text-center'>
          Version 1.0.0 - Built with Expo + NativeWind + Zustand
        </Text>
      </VStack>
    </VStack>
  )
}

export default Profile
