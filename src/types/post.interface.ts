import { IUserNames } from './user.interface'
import { IComment } from './comment.interface'

export interface IPost {
	_id: string
	user: IUserNames
	text: string
	image: string
	comments: IComment[]
	createdAt: string
	updatedAt: string
}

export interface IPostResponse {
	text: string
	image?: string
}

export interface IPostUpdate {
	text?: string
	image?: string
}
