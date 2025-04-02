import { instance } from '@/api/api.interceptor'
import { UrlEnums } from '@/constants/url.enum'

import { IConversation } from '@/types/conversation.interface'


export const ConversationService = {
	async getConversationById(conversationId: string) {
		return instance<IConversation>({
			url: `${UrlEnums.conversation}/${conversationId}`,
			method: 'GET',
		})
	},

	async getConversations() {
		return instance<IConversation[]>({
			url: `${UrlEnums.conversation}`,
			method: 'GET',
		})
	},
	async searchUserConversations(searchTerm: string) {
		return instance<IConversation[]>({
			url: `${UrlEnums.conversation}/search/${searchTerm}`,
			method: 'GET',
		})
	},

	async createConversation(withUserId: string) {
		return instance<IConversation>({
			url: `${UrlEnums.conversation}`,
			method: 'POST',
			data: { withUserId },
		})
	},
}
