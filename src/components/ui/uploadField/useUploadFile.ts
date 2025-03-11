import { useMutation } from 'react-query'
import { MediaService } from '../../../services/media.service'
import { errorCatch } from '../../../api/api.helper'
import { ChangeEvent } from 'react'
import { emptyValue } from '@/lib/empty-value'
import { successUpload } from '@/lib/success-upload'

export const useUploadFile = (
	onChange: (...event: any) => void,
	folder?: string,
) => {
	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => MediaService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				successUpload('Фото успешно загруженно')
				onChange(data)
			},
			onError: (error: any) => {
				alert({
					message: errorCatch(error),
				})
			},
		},
	)

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files?.length) return

		const formData = new FormData()
		formData.append('media', files[0])

		await mutateAsync(formData)
	}

	return { uploadFile }
}
