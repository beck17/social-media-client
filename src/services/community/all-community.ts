import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import { ICommunity } from '../../types/community.interface'

export const AllCommunityService = {
	async getAllCommunities(): ICommunity[] {
		return instance<ICommunity[]>({
			url: `${UrlEnums.allCommunities}`,
			method: 'GET',
		})
	},
}
