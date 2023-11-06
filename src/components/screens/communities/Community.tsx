import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Button from '../../ui/button/Button'
import SubmitPost from '../feed/submitPost/SubmitPost'
import Post from '../../ui/post/Post'
import styles from './Community.module.scss'
import { useIsSubscribed, useOneCommunity } from '../../../hooks/useCommunity'
import { useDate } from '../../../hooks/useDate'
import { useMutation } from 'react-query'
import { CommunityService } from '../../../services/community/community.service'

const Community: FC = () => {
	const { query } = useRouter()
	const { community, isLoading, refetch } = useOneCommunity(query.id)
	const { isSubscribed, isSubscribedLoading, isSubscribedRefetch } =
		useIsSubscribed(query.id)

	const avatarPath = {
		avatar: isLoading
			? '/uploads/default/no-avatar.jpg'
			: community?.communityAvatar,
		background: isLoading
			? '/uploads/default/background.jpg'
			: community?.communityBackgroundPic,
	}

	const { mutateAsync } = useMutation(
		`toggle subscribe community ${community?._id}`,
		(id: string) => CommunityService.toggleSubscribe(id),
		{
			onSuccess(data) {
				refetch()
			},
		},
	)

	const toggleSubscribeHandler = async (id) => {
		await mutateAsync(id)
		await isSubscribedRefetch()
	}

	const buttonTitle = isSubscribed ? 'Отписаться' : 'Подписаться'
	return (
		<div className={styles.community}>
			{/*<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>*/}
			{/*	<ProfileForm refetch={refetchProfile} setIsOpen={setIsOpen} />*/}
			{/*</ModalEdit>*/}
			<div className={styles.images}>
				<Image
					className={styles.cover}
					src={`http://localhost:5000${avatarPath.background}`}
					alt="2"
					width={0}
					height={0}
					sizes="100vw 100vh"
					priority
				/>

				<Image
					width={0}
					height={0}
					sizes="100vw 100vh"
					src={`http://localhost:5000${avatarPath.avatar}`}
					alt="1"
					className={styles.profilePic}
				/>
			</div>
			<div className={styles.uInfo}>
				<div className={styles.title}>
					<span>{community?.name}</span>
					<span className={styles.info}>
						{community?.members.length} подписчиков
					</span>
					<span className={styles.info}>{useDate(community?.createdAt)}</span>
				</div>
				<Button onClick={() => toggleSubscribeHandler(community?._id)}>
					{buttonTitle}
				</Button>
			</div>
			<div className={styles.communityContainer}>
				<SubmitPost />
				{community?.posts?.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	)
}

export default Community
