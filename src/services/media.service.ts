import { instance } from '@/api/api.interceptor'

export interface IMediaResponse {
	image: string
}

export const MediaService = {
	async upload(media: FormData, folder?: string) {
		return instance.post<IMediaResponse>('/media', media, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},
}
