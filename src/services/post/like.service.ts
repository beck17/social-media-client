import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import { ILike } from '../../types/like.interface'

export const LikePostService = {
	async getLike(postId: string) {
		return instance<boolean>({
			url: `${UrlEnums.postLikes}/${postId}`,
			method: 'GET',
		})
	},

	async getCount(postId: string) {
		return instance<boolean>({
			url: `${UrlEnums.postLikes}/count/${postId}`,
			method: 'GET',
		})
	},

	async toggleLike(postId: string) {
		return instance<ILike>({
			url: UrlEnums.postLikes,
			method: 'POST',
			data: { postId },
		})
	},
}
