import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/useAuth'
import { useOneCommunity } from '@/hooks/useCommunity'

import CommunityContent from './communityContent/CommunityContent'
import PostLoader from '@/components/ui/skeletons/post-loader/PostLoader'
import CommunityActions from './communityItem/CommunityActions'
import { CoverWithAvatar } from '@/components/ui/images/CoverWithAvatar'
import { CommunityInfo } from '@/components/shared/community-info/CommunityInfo'
import { InfoSkeleton } from '@/components/ui/skeletons/info-item-skeleton/InfoItemSkeleton'
import { CoverWithAvatarSkeleton } from '@/components/ui/skeletons/cover-with-avatar-skeleton/CoverWithAvatarSkeleton'

import { ICommunity } from '@/types/community.interface'

import styles from './Community.module.scss'


const Community: FC = () => {
	const { user } = useAuth()
	const router = useRouter()
	const id = router.query.id as string

	const { community = {} as ICommunity, isLoading, refetch } = useOneCommunity(id)

	const isCreator: boolean = user._id === community.creator

	const imagesRender = () => {
		if (isLoading) return <CoverWithAvatarSkeleton />

		return (
			<CoverWithAvatar
				backgroundPic={community.communityBackgroundPic}
				avatar={community.communityAvatar}
			/>
		)
	}

	const infoBlockRender = () => {
		if (isLoading) return <InfoSkeleton />
		return (
			<>
				<CommunityInfo
					communityName={community.name}
					membersCount={community.members.length}
					communityCreatedAt={community.createdAt}
				/>
				<CommunityActions
					refetch={refetch}
					isCreator={isCreator}
				/>
			</>
		)
	}

	const renderData = () => {
		if (isLoading) return <PostLoader />

		return (
			<CommunityContent
				community={community}
				isLoading={isLoading}
				isCreator={isCreator}
			/>
		)
	}

	return (
		<div className={styles.community}>
			{imagesRender()}
			<div className={styles.uInfo}>
				{infoBlockRender()}
			</div>
			<div className={styles.communityContainer}>
				{renderData()}
			</div>
		</div>
	)
}

export default Community
