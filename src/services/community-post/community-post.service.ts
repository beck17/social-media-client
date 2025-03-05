import { instance } from '@/api/api.interceptor'
import { UrlEnums } from '@/constants/url.enum'

import {
	ICommunityPost,
	ICommunityPostCreate,
	ICommunityPostUpdate,
} from '@/types/community-post.interface'


export const CommunityPostService = {
	async getCommunityPosts(communityId: string| undefined) {
		return instance<ICommunityPost[]>({
			url: `${UrlEnums.communityPost}/${communityId}`,
			method: 'GET',
		})
	},

	async createCommunityPost({
															text,
															image,
															communityId,
														}: ICommunityPostCreate) {
		return instance<ICommunityPost>({
			url: `${UrlEnums.communityPost}`,
			method: 'POST',
			data: { text, image, communityId },
		})
	},

	async updateCommunityPost(
		{ text, image }: ICommunityPostUpdate,
		postId: string,
	) {
		return instance<ICommunityPost>({
			url: `${UrlEnums.communityPost}/${postId}`,
			method: 'PUT',
			data: { text, image },
		})
	},

	async deleteCommunityPost(postId: string) {
		return instance<ICommunityPost>({
			url: `${UrlEnums.communityPost}/${postId}`,
			method: 'DELETE',
		})
	},
}
