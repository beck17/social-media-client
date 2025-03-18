import React, { FC } from 'react'
import Image from 'next/image'

import photo from '@/assets/img/photo.svg'

import styles from './FileUploadButton.module.scss'


interface Props {
	onUpload:  (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const FileUploadButton: FC<Props> = ({ onUpload }) => {

	return (
		<>
			<input
				type='file'
				id='file'
				onChange={onUpload}
				style={{ display: 'none' }}
			/>
			<label htmlFor='file'>
				<div className={styles.file}>
					<Image src={photo} alt='фото' width={25} height={25} />
					<span>Добавить фото</span>
				</div>
			</label>
		</>
	)
}