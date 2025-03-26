import React, { FC } from 'react'

import {
	useAllCommunity,
	useSearchAllCommunities,
} from '@/hooks/useCommunity'

import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'

import styles from './CommunityItems.module.scss'


const AllCommunities: FC = () => {
	const { communities: allCommunities = [], isLoading } = useAllCommunity()
	const {
		searchCommunities = [],
		handleSearch,
		searchTerm,
		searchIsLoading
	} = useSearchAllCommunities()

	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<div className={styles.communityTop}>
					<span>Все сообщества</span>
					<Input
						value={searchTerm}
						onChange={handleSearch}
						placeholder="Найти сообщество..."
					/>
				</div>
				{searchIsLoading || isLoading ? (
					<p>Загрузка...</p>
				) : searchCommunities.length >= 1 ? (
					searchCommunities.map((community) => (
						<CommunityItem key={community._id} community={community} />
					))
				) : searchTerm === '' && allCommunities.length >= 1 ? (
					allCommunities.map((community) => (
						<CommunityItem key={community._id} community={community} />
					))
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '20vh',
						}}
					>
						<span style={{ color: '#afafaf' }}>Сообщества не найдены</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default AllCommunities