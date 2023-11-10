import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import {
	ICommunity,
	ICommunityCreate,
	ICommunityResponse,
	ICommunityUpdate,
} from '../../types/community.interface'

export const CommunityService = {
	async getAllCommunities(): ICommunity[] {
		return instance<ICommunity[]>({
			url: `${UrlEnums.community}`,
			method: 'GET',
		})
	},

	async createCommunity({ name, description }: ICommunityCreate): ICommunity {
		return instance<ICommunity>({
			url: `${UrlEnums.community}`,
			method: 'POST',
			data: { name, description },
		})
	},

	async getOneCommunity(id: string): ICommunity {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${id}`,
			method: 'GET',
		})
	},

	async toggleSubscribe(communityId: string): ICommunity {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${communityId}`,
			method: 'POST',
		})
	},

	async getUserCommunities(userId: string): ICommunityResponse[] {
		return instance<ICommunityResponse[]>({
			url: `${UrlEnums.community}/user/${userId}`,
			method: 'GET',
		})
	},

	async searchAllCommunities(search: string): ICommunityResponse[] {
		return instance<ICommunityResponse[]>({
			url: `${UrlEnums.community}/search/${search}`,
			method: 'GET',
		})
	},

	async isSubscribed(communityId: string): boolean {
		return instance<boolean>({
			url: `${UrlEnums.community}/userSub/${communityId}`,
			method: 'GET',
		})
	},

	async updateCommunity(
		{
			name,
			description,
			communityAvatar,
			communityBackgroundPic,
		}: ICommunityUpdate,
		communityId: string,
	): ICommunity {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${communityId}`,
			method: 'PUT',
			data: { name, description, communityAvatar, communityBackgroundPic },
		})
	},

	async removeCommunity(communityId: string): ICommunity {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${communityId}`,
			method: 'DELETE',
		})
	},
}
