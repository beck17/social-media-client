import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useProfile } from '../../../hooks/useProfile'

import friends from '@/assets/img/friends.svg'
import news from '@/assets/img/news.svg'
import messanger from '@/assets/img/messanger.svg'
import search from '@/assets/img/search.svg'
import audio from '@/assets/img/audio.svg'
import video from '@/assets/img/video.svg'
import community from '@/assets/img/community.svg'

import styles from './LeftSidebar.module.scss'

const LeftSidebar: FC = () => {
	const { myProfile, isLoading } = useProfile()

	return (
		<div className={styles.sidebar}>
			<div className={styles.container}>
				<Link href="/profile" className={styles.user}>
					<Image
						src={
							isLoading
								? 'http://localhost:5000/uploads/default/no-avatar.jpg'
								: `http://localhost:5000${myProfile?.avatar}`
						}
						alt="avatar"
						width={500}
						height={500}
					/>
					<span>
						{isLoading
							? 'тут должен быть скелетон'
							: `${myProfile?.firstName} ${myProfile?.lastName}`}
					</span>
				</Link>
				<Link href="/friends" className={styles.item}>
					<Image src={friends} alt="friends" />
					<span>Друзья</span>
				</Link>
				<Link href="/feed" className={styles.item}>
					<Image src={news} alt="Новости" />
					<span>Новости</span>
				</Link>
				<Link href="/im" className={styles.item}>
					<Image src={messanger} alt="Сообщения" />
					<span>Сообщения</span>
				</Link>
				<Link href="/communities" className={styles.item}>
					<div className={styles.item}>
						<Image src={community} alt="Сообщества" />
						<span>Сообщества</span>
					</div>
				</Link>
				<Link href="/audio" className={styles.item}>
					<div className={styles.item}>
						<Image src={audio} alt="Аудио" />
						<span>Аудиозаписи</span>
					</div>
				</Link>
				<Link href="/video" className={styles.item}>
					<div className={styles.item}>
						<Image src={video} alt="Видео" />
						<span>Видео</span>
					</div>
				</Link>
				<Link href="/search" className={styles.item}>
					<div className={styles.item}>
						<Image src={search} alt="Поиск" />
						<span>Поиск</span>
					</div>
				</Link>
				{/*<div className={styles.item}>*/}
				{/*	<Image src={like} alt="Избранное" width={30} height={30} />*/}
				{/*	<span>Избранное</span>*/}
				{/*</div>*/}
			</div>
		</div>
	)
}

export default LeftSidebar
