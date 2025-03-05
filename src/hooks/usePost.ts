import { useQuery } from 'react-query'

import { PostService } from '@/services/post/post.service'


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
