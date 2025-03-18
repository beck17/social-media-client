import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'

import { MediaService } from '@/services/media.service'

import { errorCatch } from '@/api/api.helper'
import { toastSuccess } from '@/lib/toast-success'


export const useUploadBackground = (
	onChange: (...event: any) => void,
	folder?: string,
) => {
	const { mutateAsync } = useMutation(
		'upload background file',
		(data: FormData) => MediaService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				toastSuccess('Фото успешно загруженно')
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

	return { uploadBackground: uploadFile }
}
