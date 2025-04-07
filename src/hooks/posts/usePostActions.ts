import { useMutation } from 'react-query'
import { IPostResponse, IPostUpdate } from '@/types/post.interface'
import { PostService } from '@/services/post/post.service'

export const useCreatePost = (refetch: () => void) => {
	const { mutateAsync: createPost } = useMutation(
		'create post',
		(data: IPostResponse) => PostService.createPost(data),
		{
			onSuccess: () => {
				refetch()
			}
		}
	)

	return { createPost }
}

export const useDeletePost = (postId: string) => {
	const { mutateAsync: deletePost } = useMutation(
		`delete post ${postId}`,
		(postId: string) => PostService.deletePost(postId),
	)

	return { deletePost }
}

export const useUpdatePost = (postId: string) => {
	const { mutateAsync: updatePost } = useMutation(
		`update post ${postId}`,
		(data: IPostUpdate) => PostService.updatePost(data, postId),
	)

	return { updatePost }
}