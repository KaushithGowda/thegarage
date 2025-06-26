import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { useRouter } from 'expo-router'
import { useUserStore } from '@/store/useUserStore'
import { usePreferenceStore } from '@/store/usePreferenceStore'
import { useState } from 'react'
import { useLogout } from '@/hooks/useLogout'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogBody,
} from '@/components/ui/alert-dialog'
import { View, ScrollView } from 'react-native'
import ScreenTransition from '@/components/transistions/screen-transition'
import { Ionicons } from '@expo/vector-icons'

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
    <ScreenTransition>
      <View className='flex-row justify-between px-4 pt-4'>
        <Button
          variant='link'
          onPress={() => router.push('/edit-profile')}
          className='w-10 h-10 rounded-full items-center justify-center bg-background-100'
        >
          <Ionicons
            name='build'
            size={20}
            color={mode === 'light' ? '#000' : '#fff'}
          />
        </Button>
        <Button
          variant='link'
          onPress={toggle}
          className='w-10 h-10 rounded-full items-center justify-center elevation-2xl bg-background-100'
        >
          <Ionicons
            name={mode === 'light' ? 'moon' : 'sunny'}
            size={20}
            color={mode === 'light' ? '#000' : '#fff'}
          />
        </Button>
      </View>

      <VStack className='flex-1 px-4 py-6' space='4xl'>
        {/* Avatar and Name */}
        <VStack space='lg' className='items-center'>
          <View className='w-28 h-28 bg-background-950 rounded-full items-center justify-center shadow-hard-3'>
            <Text className='text-4xl font-bold text-typography-0'>
              {(user?.name?.[0] || 'U').toUpperCase()}
            </Text>
          </View>
          <VStack className='items-center space-y-1'>
            <View className='flex-row justify-center items-center gap-2'>
              <Text className='text-xl font-bold text-typography-900'>
                {user?.name || 'User Name'}
              </Text>
              <Ionicons
                name='checkmark-circle'
                size={16}
                color={mode === 'light' ? '#000' : '#fff'}
              />
            </View>
          </VStack>
        </VStack>

        {/* Info Section */}
        <VStack
          space='sm'
          className='bg-background-100 rounded-xl px-5 py-8 shadow-hard-2'
        >
          <Text className='text-xs font-semibold uppercase text-typography-400 mb-2 tracking-widest'>
            Account Info
          </Text>

          <Row
            label='Email'
            value={
              <View className='flex-row items-center gap-1'>
                <Text className='text-sm font-medium text-typography-900'>
                  {user?.email || 'username@email.com'}
                </Text>
                <Text className='text-typography-500'>
                  <Ionicons
                    name='shield-checkmark-outline'
                    size={14}
                    className='text-typography-500'
                  />
                </Text>
              </View>
            }
          />

          <Row
            label='Phone Number'
            value={
              <View className='flex-row items-center gap-1'>
                <Text className='text-sm font-medium text-typography-900'>
                  {user?.phoneNumber || '+xx xxxxx xxxxx'}
                </Text>
                <Text className='text-typography-500'>
                  <Ionicons
                    name='shield-checkmark-outline'
                    size={14}
                    className='text-typography-500'
                  />
                </Text>
              </View>
            }
          />
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
                      <Button
                        className={`${mode === 'light' ? 'bg-error-300' : 'bg-error-700'}`}
                        size='sm'
                        onPress={logout}
                      >
                        <ButtonText
                          className={`${mode === 'dark' && 'text-typography-950'}`}
                        >
                          Logout
                        </ButtonText>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant='solid'
                  size='sm'
                  onPress={() => setShowAlertDialog(true)}
                  className={`${mode === 'light' ? 'bg-error-300' : 'bg-error-700'} rounded-xl px-5`}
                >
                  <Ionicons
                    name='exit-outline'
                    color={mode === 'light' ? '#000' : '#fff'}
                    size={14}
                  />
                </Button>
              </>
            }
          />
        </VStack>

        {/* Footer */}
        <VStack className='items-center pt-6 space-y-1'>
          <Text className='text-xs text-typography-400'>Joined Jan 2024</Text>
          <Text className='text-xs text-typography-400 text-center'>
            Version 1.0.0 - Built with Expo + NativeWind + Zustand
          </Text>
        </VStack>
      </VStack>
    </ScreenTransition>
  )
}

export default Profile
