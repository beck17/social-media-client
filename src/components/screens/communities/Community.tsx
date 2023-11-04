import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Button from '../../ui/button/Button'
import SubmitPost from '../feed/submitPost/SubmitPost'
import Post from '../../ui/post/Post'
import styles from './Community.module.scss'
import { useOneCommunity } from '../../../hooks/useCommunity'
import { useDate } from '../../../hooks/useDate'

const Community: FC = () => {
	const { query } = useRouter()
	const { community } = useOneCommunity(query.id)
	return (
		<div className={styles.community}>
			{/*<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>*/}
			{/*	<ProfileForm refetch={refetchProfile} setIsOpen={setIsOpen} />*/}
			{/*</ModalEdit>*/}
			<div className={styles.images}>
				<Image
					className={styles.cover}
					src={`http://localhost:5000${community?.communityBackgroundPic}`}
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
					src={`http://localhost:5000${community?.communityAvatar}`}
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
				<Button>Подписаться</Button>
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
