import { instance } from '../../api/api.interceptor'
import { UrlEnums } from '../../enums/url.enum'
import { IPost, IPostResponse, IPostUpdate } from '../../types/post.interface'

export const PostService = {
	async getAllPost(): IPost[] {
		return instance<IPost[]>({
			url: `${UrlEnums.post}`,
			method: 'GET',
		})
	},

	async getUserPosts(userId: string): IPost[] {
		return instance<IPost[]>({
			url: `${UrlEnums.post}/user/${userId}`,
			method: 'GET',
		})
	},

	async getPostById(id: string) {
		return instance<IPost>({
			url: `${UrlEnums.post}/${id}`,
			method: 'GET',
		})
	},

	async createPost({ image, text }: IPostResponse): IPost {
		return instance<IPost>({
			url: `${UrlEnums.post}`,
			method: 'POST',
			data: { image, text },
		})
	},

	async updatePost({ text, image }: IPostUpdate, id: string) {
		return instance<IPost>({
			url: `${UrlEnums.post}/${id}`,
			method: 'PUT',
			data: { text, image },
		})
	},

	async deletePost(id: string) {
		return instance<IPost>({
			url: `${UrlEnums.post}/${id}`,
			method: 'DELETE',
		})
	},
}
