import { IUser } from './user.interface'

export interface IConversation {
	_id: string
	messages: IMessage[]
	createdAt: string
	updatedAt: string
}

export interface IMessage {
	_id: string
	text: string
	userTo: IUser
	userFrom: IUser
	createdAt: string
	updatedAt: string
	__v?: number
}

export interface IMessageData {
	text: string
	userTo: string
	conversationId: string
}

export interface IMessageRemove {
	_id: string
	text: string
	userTo: string
	userFrom: string
	createdAt: string
	updatedAt: string
}

export interface IMessageFields {
	text: string
	userTo: string
	userFrom: string
	conversationId: string
}
