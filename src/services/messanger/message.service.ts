import { instance } from '@/api/api.interceptor'
import { UrlEnums } from '@/constants/url.enum'

import {
	IConversation,
	IMessageData,
	IMessageRemove,
} from '@/types/conversation.interface'


export const MessageService = {
	async createMessage({
												text,
												userTo,
												conversationId,
											}: IMessageData) {
		return instance<IConversation>({
			url: `${UrlEnums.message}`,
			method: 'POST',
			data: { text, userTo, conversationId },
		})
	},

	async removeMessage(messageId: string) {
		return instance<IMessageRemove>({
			url: `${UrlEnums.message}/${messageId}`,
			method: 'DELETE',
		})
	},
}
