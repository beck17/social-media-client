import React, { FC } from 'react'
import Image from 'next/image'

import photo from '@/assets/img/photo.svg'

import styles from './FileUploadButton.module.scss'


interface Props {
	text: string
	htmlFor: string
	onUpload:  (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const FileUploadButton: FC<Props> = ({ text, onUpload, htmlFor }) => {
	return (
		<>
			<input
				type='file'
				id={htmlFor}
				onChange={onUpload}
				style={{ display: 'none' }}
			/>
			<label htmlFor={htmlFor}>
				<div className={styles.file}>
					<Image src={photo} alt='фото' width={25} height={25} />
					<span>{text}</span>
				</div>
			</label>
		</>
	)
}