import { FC, useState } from 'react'
import Image from 'next/image'
import { useMutation } from 'react-query'

import { LikePostService } from '../../../services/post/like.service'

import { usePostComments } from '../../../hooks/useComment'
import { useLike } from '../../../hooks/useLike'

import UserInfo from './user-info/UserInfo'
import Comments from '../comment/Comment'

import { IPost } from '../../../types/post.interface'

import likeRed from '@/assets/img/like-red.svg'
import like from '@/assets/img/like.svg'
import commentsImg from '@/assets/img/comments.svg'

import styles from './Post.module.scss'

const Post: FC<{ post: IPost }> = ({ post }) => {
	const [commentOpen, setCommentOpen] = useState<boolean>(false)

	const { comments, refetch } = usePostComments(post._id)
	const commentCount = comments?.length || 0

	const { liked, count, refetchHandler } = useLike(post._id)
	const likeSvgPic = liked ? likeRed : like
	const likeCount = count || 0

	const { mutateAsync } = useMutation(
		`add like on post ${post._id}`,
		(id: string) => LikePostService.toggleLike(id),
		{
			onSuccess(data) {
				refetchHandler()
			},
		},
	)

	const toggleLikeHandler = async (id) => {
		await mutateAsync(id)
	}

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<UserInfo post={post} />
				<div className={styles.content}>
					<p>{post.text}</p>
					{post.image && (
						<Image
							src={`http://localhost:5000${post.image}`}
							width={1000}
							height={1000}
							alt="Фото"
						/>
					)}
				</div>
				<div className={styles.info}>
					<div className={styles.item}>
						<div onClick={() => toggleLikeHandler(post._id)}>
							<Image src={likeSvgPic} alt="лайк" width={25} height={25} />
						</div>
						{likeCount}
					</div>
					<div
						className={styles.item}
						onClick={() => setCommentOpen((prev) => !prev)}
					>
						<Image src={commentsImg} alt="Коммент" width={25} height={25} />
						{commentCount}
					</div>
				</div>
				{commentOpen && (
					<Comments
						postId={post._id}
						postUserId={post.user._id}
						refetch={refetch}
						comments={comments}
					/>
				)}
			</div>
		</div>
	)
}

export default Post
