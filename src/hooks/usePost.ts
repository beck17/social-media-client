import { useMutation, useQuery } from 'react-query'

import { PostService } from '@/services/post/post.service'
import { IPostResponse, IPostUpdate } from '@/types/post.interface'
import { SubmitHandler } from 'react-hook-form'
import { toastSuccess } from '@/lib/toast-success'
import { toastError } from '@/lib/toast-error'


export const useAllPost = () => {
	const { data, isLoading, refetch } = useQuery(
		'get all posts',
		() => PostService.getAllPost(),
		{
			select: ({ data }) => data,
		},
	)

	return { posts: data, isLoading, refetch }
}

export const useUserPost = (userId: string | undefined) => {
	const { data, isLoading, refetch } = useQuery(
		`get user posts${userId}`,
		() => PostService.getUserPosts(userId),
		{
			select: ({ data }) => data,
		},
	)

	return { posts: data, isLoading, refetch }
}


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


export const useDeletePost = (postId: string, refetch: () => void) => {
	const { mutateAsync: deletePost } = useMutation(
		`delete post ${postId}`,
		(postId: string) => PostService.deletePost(postId),
		{
			onSuccess(data) {
				refetch()
				toastSuccess('Пост успешно удален')
			},
			onError() {
				toastError('Не удалость удалить пост')
			},
		},
	)

	return { deletePost }
}

export const useUpdatePost = (postId: string, refetch: () => void) => {
	const { mutateAsync: updatePost } = useMutation(
		`update post ${postId}`,
		(data: IPostUpdate) => PostService.updatePost(data, postId),
		{
			onSuccess(data) {
				refetch()
				toastSuccess('Пост успешно обновлен')
			},
			onError() {
				toastError('Не удалость обновить пост')
			},
		},
	)

	return { updatePost }
}

