import { useMutation, useQuery } from 'react-query'

import { LikePostService } from '@/services/post/like.service'


export const useLike = (postId: string) => {
	const { data: liked, refetch: likedRefetch } = useQuery(
		`getLike on post ${postId}`,
		() => LikePostService.getLike(postId),
		{
			select: ({ data }) => data,
		},
	)

	const { data: count, refetch: countRefetch } = useQuery(
		`getLikeCount on post ${postId}`,
		() => LikePostService.getCount(postId),
		{
			select: ({ data }) => data,
		},
	)

	const refetchHandler = async () => {
		await likedRefetch()
		await countRefetch()
	}

	return { liked, count, refetchHandler }
}

export const useToggleLike = (postId: string) => {
	const { mutateAsync: toggleLike } = useMutation(
		`add like on post ${postId}`,
		(postId: string) => LikePostService.toggleLike(postId),
	)

	return {toggleLike}
}
