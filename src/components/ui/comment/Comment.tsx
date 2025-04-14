import { FC } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { useNameAndAvatarProfile } from '@/hooks/user/useProfile'
import { useNewComment } from '@/hooks/posts/useComment'

import CommentItem from './CommentItem'
import Button from '../button/Button'
import Input from '../input/Input'

import { IComment, ICommentRequest } from '@/types/comment.interface'

import styles from './Comment.module.scss'
import { AvatarSkeleton } from '@/components/skeletons/avatar-skeleton/AvatarSkeleton'


interface Props {
	comments?: IComment[]
	postId: string
	refetch: () => void
	postUserId: string
}

const Comments: FC<Props> = ({ comments, postUserId, postId, refetch }) => {
	const { nameAndAvatar, isLoading } = useNameAndAvatarProfile()

	const {
		register,
		reset,
		handleSubmit,
	} = useForm<ICommentRequest>({
		mode: 'onChange',
	})

	const { onSubmitForm } = useNewComment(postId, reset, refetch)

	const renderImage = () => {
		if (isLoading) return <AvatarSkeleton />

		return (
			<Image
				src={process.env.BASE_URL + `${nameAndAvatar?.avatar}`}
				width={100}
				height={100}
				alt='аватар'
			/>
		)
	}

	return (
		<div className={styles.comments}>
			<form onSubmit={handleSubmit(onSubmitForm)} className={styles.write}>
				{renderImage()}
				<Input
					{...register('text')}
					placeholder='Введите комментарий...'
				/>
				<Button>Отправить</Button>
			</form>
			{comments?.map((comment) => (
				<CommentItem
					key={comment._id}
					comment={comment}
					postUserId={postUserId}
					refetchComment={refetch}
				/>
			))}
		</div>
	)
}

export default Comments
