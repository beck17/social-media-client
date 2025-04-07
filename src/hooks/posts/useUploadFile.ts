import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useMutation } from 'react-query'

import { MediaService } from '@/services/post/media.service'

import { errorCatch } from '@/api/api.helper'
import { toastError } from '@/lib/toast-utils/toast-error'
import { toastPromise } from '@/lib/toast-utils/toast-promise'


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

		await toastPromise(mutateAsync(formData))
	}

	return { uploadFile }
}
