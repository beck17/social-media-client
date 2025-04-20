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

export const useUserFeed = () => {
	const { data, isLoading, refetch } = useQuery(
		'get user feed',
		() => PostService.getUserFeed(),
		{
			select: ({ data }) => data,
		},
	)



	return { posts: data, isLoading, refetch }
}

export const useOnePost = (postId: string) => {
	const { data, isLoading, refetch } = useQuery(
		`get one post ${postId}`,
		() => PostService.getPostById(postId),
		{
			select: ({ data }) => data,
		},
	)

	return { post: data, isLoading, refetch }
}

export const useUserPost = (userId: string) => {
	const { data, isLoading, refetch } = useQuery(
		`get user posts${userId}`,
		() => PostService.getUserPosts(userId),
		{
			select: ({ data }) => data,
		},
	)

	return { posts: data, isLoading, refetch }
}

