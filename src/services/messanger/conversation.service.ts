import { instance } from '../../api/api.interceptor'
import { IConversation } from '../../types/conversation.interface'
import { UrlEnums } from '../../enums/url.enum'

export const ConversationService = {
	async getConversation(conversationId: string): IConversation {
		return instance<IConversation>({
			url: `${UrlEnums.conversation}/${conversationId}`,
			method: 'GET',
		})
	},

	async createConversation(withUserId: string): IConversation {
		return instance<IConversation>({
			url: `${UrlEnums.conversation}`,
			method: 'POST',
			data: { withUserId },
		})
	},
}
