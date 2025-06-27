// components/profile-form.tsx
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { profileSchema } from '@/schemas'
import { FormControl } from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format, parseISO } from 'date-fns'
import { TouchableOpacity } from 'react-native'

interface ProfileFormProps {
  profile: {
    name?: string
    phoneNumber?: string
    dexp?: string
    rexp?: string
  }
  onSuccess?: () => void
}

const ProfileForm = ({ profile, onSuccess }: ProfileFormProps) => {
  const router = useRouter()
  const [activeDateField, setActiveDateField] = useState<
    'dexp' | 'rexp' | null
  >(null)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || '',
      phoneNumber: profile?.phoneNumber || '',
      dexp: profile?.dexp || '',
      rexp: profile?.rexp || '',
    },
  })

  const updateMutation = useUpdateProfile({
    onSuccess: () => {
      showToast({
        isSuccess: true,
        successMsg: 'Profile updated successfully',
      })
      onSuccess?.()
      router.back()
    },
    onError: (error: Error) => {
      showToast({
        isError: true,
        errorMsg: error.message || 'Failed to update profile',
      })
    },
  })

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    // updateMutation.mutate(values)
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && activeDateField && selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd')
      form.setValue(activeDateField, formattedDate, { shouldValidate: true })
    }
    setActiveDateField(null)
  }

  const getDateDisplayValue = (field: 'dexp' | 'rexp') => {
    const value = form.watch(field)
    return value ? format(parseISO(value), 'MMM d, yyyy') : 'Select date'
  }

  return (
    <VStack space='md'>
      {/* Name Field */}
      <FormControl isInvalid={!!form.formState.errors.name}>
        <Text className='text-xs text-typography-400 mb-1'>Name</Text>
        <Input variant='outline' size='md' className='rounded-xl h-12'>
          <InputField
            placeholder='Enter your name'
            value={form.watch('name')}
            onChangeText={(text) => form.setValue('name', text)}
          />
        </Input>
        {form.formState.errors.name && (
          <Text className='text-error-400 text-sm mt-1'>
            {form.formState.errors.name.message}
          </Text>
        )}
      </FormControl>

      {/* Phone Number Field */}
      <FormControl isInvalid={!!form.formState.errors.phoneNumber}>
        <Text className='text-xs text-typography-400 mb-1'>Phone Number</Text>
        <Input variant='outline' size='md' className='rounded-xl h-12'>
          <InputField
            placeholder='Enter phone number'
            keyboardType='phone-pad'
            value={form.watch('phoneNumber')}
            onChangeText={(text) => form.setValue('phoneNumber', text)}
          />
        </Input>
        {form.formState.errors.phoneNumber && (
          <Text className='text-error-400 text-sm mt-1'>
            {form.formState.errors.phoneNumber.message}
          </Text>
        )}
      </FormControl>

      {/* Driving Experience */}
      <FormControl isInvalid={!!form.formState.errors.dexp}>
        <Text className='text-xs text-typography-400 mb-1'>Driving Since</Text>
        <Input
          variant='outline'
          size='md'
          className='rounded-xl h-12'
          onTouchEnd={() => setActiveDateField('dexp')}
        >
          <InputField
            value={getDateDisplayValue('dexp')}
            editable={false}
            pointerEvents='none'
          />
        </Input>
        {activeDateField === 'dexp' && (
          <DateTimePicker
            value={
              form.watch('dexp') ? parseISO(form.watch('dexp')) : new Date()
            }
            mode='date'
            display='default'
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        {form.formState.errors.dexp && (
          <Text className='text-error-400 text-sm mt-1'>
            {form.formState.errors.dexp.message}
          </Text>
        )}
      </FormControl>

      {/* Riding Experience */}
      <FormControl isInvalid={!!form.formState.errors.rexp}>
        <Text className='text-xs text-typography-400 mb-1'>Riding Since</Text>
        <TouchableOpacity
          className='rounded-xl h-12 justify-center px-4 bg-background-50 dark:bg-background-800'
          onPress={() => setActiveDateField('rexp')}
        >
          <Text className='text-sm text-typography-900 dark:text-typography-50'>
            {getDateDisplayValue('rexp')}
          </Text>
        </TouchableOpacity>
        {activeDateField === 'rexp' && (
          <DateTimePicker
            value={
              form.watch('rexp') ? parseISO(form.watch('rexp')) : new Date()
            }
            mode='date'
            display='default'
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        {form.formState.errors.rexp && (
          <Text className='text-error-400 text-sm mt-1'>
            {form.formState.errors.rexp.message}
          </Text>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button
        onPress={form.handleSubmit(onSubmit)}
        className='rounded-xl h-12 mt-4 bg-background-950'
        // isDisabled={updateMutation.isLoading}
      >
        {/* {updateMutation.isLoading ? (
          <ButtonText>Updating...</ButtonText>
        ) : ( */}
        <ButtonText className='text-typography-200 font-bold'>
          Submit
        </ButtonText>
        {/* )} */}
      </Button>
    </VStack>
  )
}

export default ProfileForm
