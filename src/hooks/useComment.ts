import { useMutation, useQuery } from 'react-query'
import { CommentPostService } from '@/services/post/comment.service'
import { ICommentRequest } from '@/types/comment.interface'
import { SubmitHandler, UseFormReset } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { emptyValue } from '@/lib/empty-value'

export const usePostComments = (id: string) => {
	const { isLoading, data, refetch } = useQuery(
		`get post comments${id}`,
		() => CommentPostService.getCommentsByPostId(id),
		{
			select: ({ data }) => data,
		},
	)

	return { isLoading, comments: data, refetch }
}

export const useUpdateComment = (
	commentId: string,
	refetch: () => void,
	reset: UseFormReset<{ text: string }>,
	setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
	const { mutateAsync } = useMutation(
		'update comment',
		(text: string) => CommentPostService.updatePostComment(text, commentId),
		{
			onSuccess(data) {
				refetch()
				reset()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmit: SubmitHandler<{ text: string }> = async ({ text }) => {
		if (text.trim() === '') return emptyValue('Это поле обязательное')
		await mutateAsync(text)
	}

	return { onSubmit }
}

export const useNewComment = (
	postId: string,
	reset: UseFormReset<ICommentRequest>,
	refetch: () => void,
) => {
	const { mutateAsync } = useMutation(
		`create a new comment ${postId}`,
		(data: ICommentRequest) =>
			CommentPostService.createPostComment({ ...data, postId }),
		{
			onSuccess(data) {
				reset()
				refetch()
			},
		},
	)

	const onSubmitForm: SubmitHandler<ICommentRequest> = async (data) => {
		if (data.text.trim() === '') return emptyValue('Это поле обязательное')
		await mutateAsync(data)
	}

	return { onSubmitForm }
}

export const useRemoveComment = (
	commentId: string,
	refetch: () => void,
) => {
	const { mutateAsync } = useMutation(
		`delete comment ${commentId}`,
		(id: string) => CommentPostService.deletePostComment(id),
		{
			onSuccess(data) {
				refetch()
			},
		},
	)

	const removeCommentHandler = async (id: string) => {
		await mutateAsync(id)
	}

	return { removeCommentHandler }
}
