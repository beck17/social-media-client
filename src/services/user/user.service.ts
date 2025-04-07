import { instance } from '@/api/api.interceptor'
import { UrlEnums } from '@/constants/url.enum'

import { IUser, IUserUpdate } from '@/types/user.interface'


export const UserService = {
	async getMyProfile() {
		return instance<IUser>({
			url: `${UrlEnums.user}/profile`,
			method: 'GET',
		})
	},

	async getUserProfile(userId: string) {
		return instance<IUser>({
			url: `${UrlEnums.user}/profile/${userId}`,
			method: 'GET',
		})
	},

	async getSearchProfiles(search: string) {
		return instance<IUser[]>({
			url: `${UrlEnums.user}/search/${search}`,
			method: 'GET',
		})
	},

	async searchFriends(search: string) {
		return instance<IUser[]>({
			url: `${UrlEnums.user}/searchFriends/${search}`,
			method: 'GET',
		})
	},

	async searchSubscribers(search: string) {
		return instance<IUser[]>({
			url: `${UrlEnums.user}/searchSubscribers/${search}`,
			method: 'GET',
		})
	},

	async sendFriendRequest(friendId: string) {
		return instance<boolean>({
			url: `${UrlEnums.user}/${friendId}`,
			method: 'POST',
		})
	},

	async isFriend(friendId: string) {
		return instance<boolean>({
			url: `${UrlEnums.user}/friend/${friendId}`,
			method: 'GET',
		})
	},

	async isSubscribe(friendId: string) {
		return instance<boolean>({
			url: `${UrlEnums.user}/requestFriend/${friendId}`,
			method: 'GET',
		})
	},

	async unSubscribe(friendId: string) {
		return instance<boolean>({
			url: `${UrlEnums.user}/unSubscribe/${friendId}`,
			method: 'PUT',
		})
	},

	async removeFromFriends(friendId: string) {
		return instance<boolean>({
			url: `${UrlEnums.user}/${friendId}`,
			method: 'PUT',
		})
	},

	async updateProfile({
		firstName,
		lastName,
		city,
		avatar,
		backgroundPic,
	}: IUserUpdate) {
		return instance<IUser>({
			url: UrlEnums.user,
			method: 'PUT',
			data: { firstName, lastName, city, avatar, backgroundPic },
		})
	},
}
