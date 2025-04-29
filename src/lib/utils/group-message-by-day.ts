import { formatedDate } from '@/lib/utils/fotmated-message-date'
import { IMessage } from '@/types/conversation.interface'


type GroupedMessages = {
	date: string,
	messages: IMessage[],
}[]

export const groupMessageByDay = (messages: IMessage[]): GroupedMessages => {
	if (!messages || !Array.isArray(messages)) {
		return []
	}

	const groupMessages: GroupedMessages = []

	messages.forEach(message => {
		const date = formatedDate(message.createdAt)
		const lastGroup = groupMessages[groupMessages.length - 1]

		if (!lastGroup || lastGroup.date !== date) {
			groupMessages.push({ date, messages: [message] })
		} else {
			lastGroup.messages.push(message)
		}
	})

	return groupMessages
}