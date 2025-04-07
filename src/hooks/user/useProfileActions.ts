import { useMutation } from 'react-query'
import { IUserUpdate } from '@/types/user.interface'
import { UserService } from '@/services/user/user.service'

export const useUpdateProfile = (refetch: () => void) => {
	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserUpdate) => UserService.updateProfile(data),
		{
			onSuccess() {
				refetch()
			},
		},
	)
	return { updateProfile: mutateAsync }
}