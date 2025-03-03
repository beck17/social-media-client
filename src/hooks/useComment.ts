import { useMutation, useQuery } from 'react-query'
import { CommentPostService } from '@/services/post/comment.service'
import { ICommentRequest } from '@/types/comment.interface'

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

export const useNewComment = () => {
	const { mutateAsync } = useMutation(
		'create a new comment',
		(data: ICommentRequest) => CommentPostService.createPostComment(data),
		{
			onSuccess(data) {},
		},
	)

	return { mutateAsync }
}
