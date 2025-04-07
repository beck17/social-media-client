import { useMutation, useQuery } from 'react-query'
import { CommunityPostService } from '@/services/community-post/community-post.service'
import { IPostUpdate } from '@/types/post.interface'
import { toastSuccess } from '@/lib/toast-utils/toast-success'
import { toastError } from '@/lib/toast-utils/toast-error'

export const useCommunityPosts = (communityId: string) => {
	const { data, isLoading, refetch } = useQuery(
		`get community posts ${communityId}`,
		() => CommunityPostService.getCommunityPosts(communityId),
		{
			select: ({ data }) => data,
		},
	)

	return { communityPosts: data, isLoading, refetch }
}

export const useUpdateCommunityPost = (postId: string) => {
	const { mutateAsync: updateCommunityPost } = useMutation(
		`update community post ${postId}`,
		(data: IPostUpdate) =>
			CommunityPostService.updateCommunityPost(data, postId),
		{
			onSuccess() {
				toastSuccess('Пост успешно обновлен')
			},
			onError() {
				toastError('Не удалость обновить пост')
			},
		},
	)

	return { updateCommunityPost }
}

export const useDeleteCommunityPost = (postId: string) => {
	const { mutateAsync: deleteCommunityPost } = useMutation(
		`delete post ${postId}`,
		(postId: string) => CommunityPostService.deleteCommunityPost(postId),
	)

	return { deleteCommunityPost }
}
