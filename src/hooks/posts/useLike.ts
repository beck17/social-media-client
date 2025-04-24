import { useMutation, useQuery } from 'react-query'

import { LikePostService } from '@/services/post/like.service'
import { useState } from 'react'
import { toastPromise } from '@/lib/toast-utils/toast-promise'
import { toastError } from '@/lib/toast-utils/toast-error'


export const useLike = (postId: string) => {
	const [isLoadingLike, setIsLoadingLike] = useState<boolean>(false)
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [likedCount, setLikedCount] = useState<number>(0)

	const { refetch: likedRefetch } = useQuery(
		['is liked on post', postId],
		() => LikePostService.getLike(postId),
		{
			select: ({ data }) => data,
			onSuccess(data) {
				setIsLiked(data)
			},
		},
	)

	const { refetch: countRefetch } = useQuery(
		['get count like-button on post', postId],
		() => LikePostService.getCount(postId),
		{
			select: ({ data }) => data,
			onSuccess(data) {
				setLikedCount(data)
			},
		},
	)

	const { mutateAsync: toggleLike } = useMutation(
		['toggle like-button on post', postId],
		(postId: string) => LikePostService.toggleLike(postId),
		{
			onError: () => {
				toastError('Ошибка при лайке')
			},
		},
	)

	const toggleLikeHandler = async (id: string) => {
		if (isLoadingLike) return
		setIsLoadingLike(true)

		const likedCountPrev = likedCount
		const isLikedPrev = isLiked

		setLikedCount(prev => isLiked ? prev - 1 : prev + 1)
		setIsLiked(prev => !prev)

		try {
			await toggleLike(id)
			await likedRefetch()
			await countRefetch()
		} catch (e) {
			setIsLiked(isLikedPrev)
			setLikedCount(likedCountPrev)
		} finally {
			setIsLoadingLike(false)
		}
	}

	return { isLiked, likedCount, isLoadingLike, toggleLikeHandler }
}
