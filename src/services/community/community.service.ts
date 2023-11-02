import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import { ICommunity, ICommunityCreate } from '../../types/community.interface'

export const CommunityService = {
	async getAllCommunities(): ICommunity[] {
		return instance<ICommunity[]>({
			url: `${UrlEnums.communities}`,
			method: 'GET',
		})
	},

	async createCommunity({ name, description }: ICommunityCreate): ICommunity {
		return instance<ICommunity>({
			url: `${UrlEnums.communities}`,
			method: 'POST',
			data: { name, description },
		})
	},
}
