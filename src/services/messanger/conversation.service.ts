import { instance } from '@/api/api.interceptor'
import { UrlEnums } from '@/constants/url.enum'

import { IConversation } from '@/types/conversation.interface'


export const ConversationService = {
	async getConversation(conversationId: string) {
		return instance<IConversation>({
			url: `${UrlEnums.conversation}/${conversationId}`,
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
