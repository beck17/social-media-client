import { instance } from '@/api/api.interceptor'
import { UrlEnums } from '@/constants/url.enum'

import {
	ICommunity,
	ICommunityCreate,
	ICommunityResponse,
	ICommunityUpdate,
} from '@/types/community.interface'


export const CommunityService = {
	async getAllCommunities() {
		return instance<ICommunityResponse[]>({
			url: `${UrlEnums.community}`,
			method: 'GET',
		})
	},

	async createCommunity(data: ICommunityCreate) {
		return instance<ICommunity>({
			url: `${UrlEnums.community}`,
			method: 'POST',
			data: data,
		})
	},

	async getOneCommunity(id: string) {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${id}`,
			method: 'GET',
		})
	},

	async toggleSubscribe(communityId: string) {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${communityId}`,
			method: 'POST',
		})
	},

	async getUserCommunities(userId: string) {
		return instance<ICommunityResponse[]>({
			url: `${UrlEnums.community}/user/${userId}`,
			method: 'GET',
		})
	},

	async searchAllCommunities(search: string) {
		return instance<ICommunityResponse[]>({
			url: `${UrlEnums.community}/search/${search}`,
			method: 'GET',
		})
	},

	async searchUserCommunities(search: string) {
		return instance<ICommunityResponse[]>({
			url: `${UrlEnums.community}/searchCommunities/${search}`,
			method: 'GET',
		})
	},

	async isSubscribed(communityId: string) {
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
	) {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${communityId}`,
			method: 'PUT',
			data: { name, description, communityAvatar, communityBackgroundPic },
		})
	},

	async removeCommunity(communityId: string) {
		return instance<ICommunity>({
			url: `${UrlEnums.community}/${communityId}`,
			method: 'DELETE',
		})
	},
}
