import { instance } from '@/api/api.interceptor'
import { IComment, ICommentRequest } from '@/types/comment.interface'
import { UrlEnums } from '@/constants/url.enum'

export const CommentPostService = {
	async getCommentsByPostId(id: string) {
		return instance<IComment[]>({
			url: `/post-comment/${id}`,
			method: 'GET',
		})
	},

	async createPostComment({ text, postId }: ICommentRequest) {
		return instance<ICommentRequest>({
			url: `/post-comment`,
			method: 'POST',
			data: { text, postId },
		})
	},

	async updatePostComment(text: string, id: string) {
		return instance<IComment>({
			url: `${UrlEnums.postComment}/${id}`,
			method: 'PUT',
			data: { text },
		})
	},

	async deletePostComment(id: string) {
		return instance<IComment>({
			url: `${UrlEnums.postComment}/${id}`,
			method: 'DELETE',
		})
	},
}
