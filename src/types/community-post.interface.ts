import { IUserNames } from './user.interface'
import { IComment } from './comment.interface'
import { ICommunityNames } from './community.interface'

export interface ICommunityPost {
	_id: string
	user: IUserNames
	community: ICommunityNames
	text: string
	image: string
	// comments: IComment[]
	createdAt: string
	updatedAt: string
}

export interface ICommunityPostCreate {
	text: string
	image?: string
	communityId: string
}

export interface ICommunityPostUpdate {
	text?: string
	image?: string
}

// export interface IPostResponse {
// 	text: string
// 	image?: string
// }
//
// export interface IPostUpdate {
// 	text?: string
// 	image?: string
// }
