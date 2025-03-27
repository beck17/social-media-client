import { useMutation } from 'react-query'
import { MediaService } from '@/services/media.service'
import { errorCatch } from '@/api/api.helper'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { toastSuccess } from '@/lib/toast-success'
import { toastError } from '@/lib/toast-error'

export const useUploadFile = (
	setImageState: Dispatch<SetStateAction<{ image?: string | undefined } | undefined>>,
	folder?: string,
) => {
	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => MediaService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				setImageState(data)
				toastSuccess('Фото успешно загруженно')
			},
			onError: (error) => {
				toastError(errorCatch(error))
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
