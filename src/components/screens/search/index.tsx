import { FC } from 'react'

import FriendItem from '@/components/ui/friendItem/FriendItem'
import Input from '../../ui/input/Input'

import styles from '@/assets/styles/screens/Friends.module.scss'
import { useSearch } from '../../../hooks/useSearch'

const Search: FC = () => {
	const { isLoading, handleSearch, searchTerm, data } = useSearch()

	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<Input
					value={searchTerm}
					onChange={handleSearch}
					placeholder="Найти пользователя..."
				/>
				{isLoading ? (
					<p>Загрузка...</p>
				) : data?.length >= 1 ? (
					data?.map((user) => <FriendItem key={user._id} user={user} />)
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '75vh',
						}}
					>
						<span style={{ color: '#afafaf' }}>Пользователей не найденно</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default Search
