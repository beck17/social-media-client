import { useMutation } from 'react-query'
import { IPostResponse, IPostUpdate } from '@/types/post.interface'
import { PostService } from '@/services/post/post.service'
import { toastSuccess } from '@/lib/toast-success'
import { toastError } from '@/lib/toast-error'

export const useCreatePost = (refetch: () => void) => {
	const { mutateAsync: createPost } = useMutation(
		'create post',
		(data: IPostResponse) => PostService.createPost(data),
		{
			onSuccess: () => {
				toastSuccess('Пост успешно добавлен')
				refetch()
			},
			onError: (error: Error) => {
				toastError(error.message)
			},
		},
	)

	return { createPost }
}

export const useDeletePost = (postId: string,) => {
	const { mutateAsync: deletePost } = useMutation(
		`delete post ${postId}`,
		(postId: string) => PostService.deletePost(postId),
		{
			onSuccess() {
				toastSuccess('Пост успешно удален')
			},
			onError() {
				toastError('Не удалость удалить пост')
			},
		},
	)

	return { deletePost }
}

export const useUpdatePost = (postId: string) => {
	const { mutateAsync: updatePost } = useMutation(
		`update post ${postId}`,
		(data: IPostUpdate) => PostService.updatePost(data, postId),
		{
			onSuccess() {
				toastSuccess('Пост успешно обновлен')
			},
			onError() {
				toastError('Не удалость обновить пост')
			},
		},
	)

	return { updatePost }
}