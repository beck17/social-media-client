import { useMutation } from 'react-query'
import { CommunityService } from '@/services/community/community.service'
import { ICommunityUpdate } from '@/types/community.interface'

export const useToggleSubscribeCommunity = (communityId: string, refetch: () => void) => {
	const { mutateAsync } = useMutation(
		`toggle subscribe community ${communityId}`,
		(id: string) => CommunityService.toggleSubscribe(id),
		{
			onSuccess: () => {
				refetch()
			},
		},
	)

	return { toggleSubscribe: mutateAsync }
}

export const useUpdateCommunity = (communityId: string, refetch: () => void) => {
	const { mutateAsync } = useMutation(
		'update community',
		(data: ICommunityUpdate) =>
			CommunityService.updateCommunity(data, communityId),
		{
			onSuccess() {
				refetch()
			},
		},
	)

	return { updateCommunity: mutateAsync }
}

export const useDeleteCommunity = (communityId: string, refetch: () => void) => {
	const { mutateAsync } = useMutation(
		`delete community ${communityId}`,
		() => CommunityService.removeCommunity(communityId),
		{
			onSuccess() {
				refetch()
			},
		},
	)
	return { deleteCommunity: mutateAsync }
}
