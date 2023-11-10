import { IUser } from './user.interface'
import { ICommunityPost } from './community-post.interface'

export interface ICommunity {
	_id: string
	name: string
	description: string
	communityAvatar: string
	communityBackgroundPic: string
	creator: string
	members: IUser[]
	admins: IUser[]
	posts: ICommunityPost[]
	createdAt: string
	updatedAt: string
}

export interface ICommunityCreate {
	name: string
	description: string
}

export interface ICommunityResponse {
	_id: string
	name: string
	members: string[]
	communityAvatar: string
}

export interface ICommunityNames {
	_id: string
	name: string
	communityAvatar: string
}

export interface ICommunityUpdate {
	name?: string
	description?: string
	avatarCommunity?: string
	communityBackgroundPic?: string
}
