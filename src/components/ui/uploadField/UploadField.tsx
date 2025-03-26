import React, { FC } from 'react'
import { IUploadFieldInterface } from './uploadField.interface'

const UploadField: FC<IUploadFieldInterface> = ({ onChange }) => {
	return (
		<>
			<input
				type='file'
				id='file'
				onChange={onChange}
				style={{ display: 'none' }}
			/>
		</>
	)
}

export default UploadField
