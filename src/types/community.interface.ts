import { IUser } from './user.interface'
import { IPost } from './post.interface'

export interface ICommunity {
	_id: string
	name: string
	description: string
	communityAvatar: string
	communityBackgroundPic: string
	creator: string
	members: IUser[]
	admins: IUser[]
	posts: IPost[]
	createdAt: string
	updatedAt: string
}
