import { IUserNames } from './user.interface'

export interface IComment {
	_id: string
	text: string
	user: IUserNames
	postId: string
	createdAt: string
	updatedAt: string
}

export interface ICommentRequest {
	text: string
	postId: string
}
