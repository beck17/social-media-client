export interface IUser {
	_id: string
	firstName: string
	lastName: string
	phoneNumber: number
	password: string
	birthday?: string
	city?: string
	avatar: string
	backgroundPic: string
	createdAt?: string
	updatedAt?: string
	postCount?: number
	friends?: IUser[]
}

export interface IUserState {
	phoneNumber: number
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
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
	phoneNumber: string
	password: string
}

export interface IRegisterResponse {
	id: string
	firstName: string
	lastName: string
	phoneNumber: number
}

export interface IUserUpdate {
	firstName?: string
	lastName?: string
	city?: string
	avatar?: string
	backgroundPic?: string
}
