import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import {
	ICommunityPost,
	ICommunityPostCreate,
	ICommunityPostUpdate,
} from '../../types/community-post.interface'

export const CommunityPostService = {
	async getCommunityPosts(communityId: string): ICommunityPost[] {
		return instance<ICommunityPost[]>({
			url: `${UrlEnums.communityPost}/${communityId}`,
			method: 'GET',
		})
	},

	async createCommunityPost({
		text,
		image,
		communityId,
	}: ICommunityPostCreate): ICommunityPost {
		return instance<ICommunityPost>({
			url: `${UrlEnums.communityPost}`,
			method: 'POST',
			data: { text, image, communityId },
		})
	},

	async updateCommunityPost(
		{ text, image }: ICommunityPostUpdate,
		postId: string,
	): ICommunityPost {
		return instance<ICommunityPost>({
			url: `${UrlEnums.communityPost}/${postId}`,
			method: 'PUT',
			data: { text, image },
		})
	},

	async deleteCommunityPost(postId: string): ICommunityPost {
		return instance<ICommunityPost>({
			url: `${UrlEnums.communityPost}/${postId}`,
			method: 'DELETE',
		})
	},
}
