import React, { FC } from 'react'
import { IUploadFieldInterface } from './uploadField.interface'

const UploadField: FC<IUploadFieldInterface> = ({ onChange, folder }) => {
	return (
		<>
			<input
				type="file"
				id="file"
				onChange={uploadFile}
				style={{ display: 'none' }}
			/>
		</>
	)
}

export default UploadField
