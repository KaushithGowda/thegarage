import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import ProfileForm from '@/components/profile-form'
import { Heading } from '@/components/ui/heading'
import { useRouter } from 'expo-router'
import { useUserStore } from '@/store/useUserStore'
import { usePreferenceStore } from '@/store/usePreferenceStore'
import { useRef, useState } from 'react'
import { useLogout } from '@/hooks/auth/useLogout'
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
import { useGetProfile } from '@/hooks/profile/useGetProfile'
import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet'

const Row = ({
  label,
  value,
  action,
}: {
  label: string
  value?: React.ReactNode
  action?: React.ReactNode
}) => (
  <View className='flex-row justify-between items-center border-b border-typography-200 py-4'>
    <Text className='text-sm text-typography-500'>{label}</Text>
    {value ? <>{value}</> : action}
  </View>
)

const Profile = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const mode = usePreferenceStore((s) => s.mode)
  const toggle = usePreferenceStore((s) => s.toggleMode)
  const user = useUserStore((s) => s.user)
  const { data: profile, isLoading } = useGetProfile()
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  //Bottom sheet
  const [isEditOpen, setEditOpen] = useState(false)

  // Helper to calculate years and months from months count
  function getYearsAndMonths(months?: number) {
    if (!months || Number.isNaN(months)) return { years: 0, months: 0 }
    const years = Math.floor(months / 12)
    const remMonths = months % 12
    return { years, months: remMonths }
  }

  // Driving and Riding Experience
  const drivingExp = getYearsAndMonths(profile?.dexp)
  const ridingExp = getYearsAndMonths(profile?.rexp)
  const driving =
    drivingExp.years || drivingExp.months
      ? `${drivingExp.years}y${drivingExp.months ? ` ${drivingExp.months}m` : ''}`
      : '—'
  const riding =
    ridingExp.years || ridingExp.months
      ? `${ridingExp.years}y${ridingExp.months ? ` ${ridingExp.months}m` : ''}`
      : '—'

  // Bottom sheet ref
  const bottomSheetRef = useRef<BottomSheetRef>(null)

  const handleOpenSheet = () => {
    bottomSheetRef.current?.present()
  }

  const handleCloseSheet = () => {
    bottomSheetRef.current?.dismiss()
  }

  return (
    <ScreenTransition>
      // Update the BottomSheet section in your Profile component
      <BottomSheet
        ref={bottomSheetRef}
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        bgColor={mode === 'light' ? '#f3f4f6' : '#1f2937'}
      >
        <View
          className={`flex-1 p-6 ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
        >
          <View className='flex-row justify-between items-center mb-4'>
            <Text
              className={`text-lg font-semibold ${mode === 'light' ? 'text-gray-900' : 'text-white'}`}
            >
              Edit Profile
            </Text>
            <Button
              variant='solid'
              className='bg-background-950 rounded-xl'
              size='md'
              onPress={() => setEditOpen(false)}
            >
              <Ionicons
                name='close'
                size={24}
                color={mode === 'dark' ? '#000' : '#fff'}
              />
            </Button>
          </View>

          {/* Pass profile data to ProfileForm */}
          <ProfileForm
            profile={{
              name: profile?.name,
              phoneNumber: profile?.phoneNumber,
              dexp: profile?.dexp,
              rexp: profile?.rexp,
            }}
            onSuccess={() => setEditOpen(false)}
          />
        </View>
      </BottomSheet>
      <View className='flex-row justify-between px-4 pt-4'>
        <Button
          variant='link'
          onPress={() => setEditOpen(true)}
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
      <VStack className='flex-1 px-4 py-6' space='2xl'>
        {/* Avatar and Name */}
        <VStack space='lg' className='items-center'>
          <View className='w-20 h-20 bg-background-950 rounded-full items-center justify-center shadow-hard-3'>
            <Text className='text-4xl font-bold text-typography-0'>
              {(profile?.name?.[0] || 'U').toUpperCase()}
            </Text>
          </View>
          <VStack className='items-center space-y-1'>
            <View className='flex-row justify-center items-center gap-2'>
              <Text className='text-xl font-bold text-typography-900'>
                {profile?.name || 'User Name'}
              </Text>
              {profile?.emailVerified ? (
                <Ionicons name='checkmark-circle' size={16} color='#4094f7' />
              ) : null}
            </View>
          </VStack>
        </VStack>

        {/* Info Section */}
        <VStack
          space='xs'
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
                  {profile?.email || 'username@email.com'}
                </Text>
                {profile?.emailVerified ? (
                  <Text className='text-typography-500'>
                    <Ionicons
                      name='shield-checkmark-outline'
                      size={14}
                      className='text-typography-500'
                    />
                  </Text>
                ) : null}
              </View>
            }
          />

          <Row
            label='Phone Number'
            value={
              <View className='flex-row items-center gap-1'>
                <Text className='text-sm font-medium text-typography-900'>
                  {profile?.phoneNumber || '+xx xxxxx xxxxx'}
                </Text>
                {profile?.emailVerified ? (
                  <Text className='text-typography-500'>
                    <Ionicons
                      name='shield-checkmark-outline'
                      size={14}
                      className='text-typography-500'
                    />
                  </Text>
                ) : null}
              </View>
            }
          />
          <Row label='Driving Experience' value={driving} />
          <Row label='Riding Experience' value={riding} />
          <Row
            label='My Vehicles'
            value={
              typeof profile?.vehicles?.length === 'number'
                ? `${profile.vehicles.length} vehicle${profile.vehicles.length === 1 ? '' : 's'}`
                : '—'
            }
          />
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
        <VStack className='items-center pt-5 space-y-1'>
          <Text className='text-xs text-typography-400'>
            {profile?.createdAt
              ? `Joined ${new Date(profile.createdAt).toLocaleString(
                  'default',
                  {
                    month: 'short',
                    year: 'numeric',
                  }
                )}`
              : 'Joined'}
          </Text>
          <Text className='text-xs text-typography-400 text-center'>
            Version 1.0.0 - Built with Expo + NativeWind + Zustand
          </Text>
        </VStack>
      </VStack>
    </ScreenTransition>
  )
}

export default Profile
