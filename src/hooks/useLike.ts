import { useQuery } from 'react-query'
import { LikePostService } from '../services/post/like.service'

export const useLike = (postId) => {
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

	const refetchHandler = () => {
		likedRefetch()
		countRefetch()
	}

	return { liked, count, refetchHandler }
}
