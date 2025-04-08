import { ICommunity } from '@/types/community.interface'
import { ChangeEvent } from 'react'

export interface IUser {
	_id: string
	firstName: string
	lastName: string
	phoneNumber: number
	password: string
	birthday?: string
	city: string
	avatar: string
	backgroundPic: string
	createdAt: string
	updatedAt: string
	postCount: number
	friends: IUser[]
	requestFriends: IUser[]
	outgoingRequestsFriends: IUser[]
	communities: ICommunity[]
}

export interface INameAndAvatar {
	_id: string
	firstName: string
	avatar: string
}

export interface IUserState {
	_id: string
	firstName: string
	lastName: string
	city: string
	phoneNumber: number
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState
	isLoading: boolean
	initialized: boolean
}

export interface IUserNames {
	_id: string
	firstName: string
	lastName: string
	avatar: string
}

export interface IPhonePassword {
	phoneNumber: number
	password: string
}

export interface IUserResponse extends ITokens {
	user: IUser
}

export interface IRegisterUser {
	firstName: string
	lastName: string
	phoneNumber: number
	password: string
}

export interface IRegisterResponse extends ITokens{
	id: string
	firstName: string
	lastName: string
	phoneNumber: number
	user: IUser
}

export interface IUserUpdate {
	firstName?: string
	lastName?: string
	city?: string
	avatar?: string
	backgroundPic?: string
}

export interface IUserSearchActions {
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
	searchItems: IUser[] | undefined
	isLoadingSearch: boolean
	searchTerm: string
}
