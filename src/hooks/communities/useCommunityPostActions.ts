import { useMutation } from 'react-query'
import { ICommunityPostCreate } from '@/types/community-post.interface'
import { CommunityPostService } from '@/services/community-post/community-post.service'
import { IPostUpdate } from '@/types/post.interface'

export const useCreateCommunityPost = (refetch: () => void) => {
	const { mutateAsync } = useMutation(
		'add community post',
		(data: ICommunityPostCreate) =>
			CommunityPostService.createCommunityPost(data),
		{
			onSuccess() {
				refetch()
			},
		},
	)

	return {createPost: mutateAsync}
}

export const useUpdateCommunityPost = (postId: string) => {
	const { mutateAsync: updateCommunityPost } = useMutation(
		`update community post ${postId}`,
		(data: IPostUpdate) =>
			CommunityPostService.updateCommunityPost(data, postId),
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