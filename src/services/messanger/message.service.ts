import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import {
	IConversation,
	IMessageData,
	IMessageRemove,
} from '../../types/conversation.interface'

export const MessageService = {
	async createMessage({
		text,
		userTo,
		conversationId,
	}: IMessageData): IConversation {
		return instance<IConversation>({
			url: `${UrlEnums.message}`,
			method: 'POST',
			data: { text, userTo, conversationId },
		})
	},

	async removeMessage(messageId: string): IMessageRemove {
		return instance<IMessageRemove>({
			url: `${UrlEnums.message}/${messageId}`,
			method: 'DELETE',
		})
	},
}
