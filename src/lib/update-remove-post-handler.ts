import { useDeletePost, useUpdatePost } from '@/hooks/usePost'
import { useDeleteCommunityPost, useUpdateCommunityPost } from '@/hooks/useCommunityPost'

export const updateRemovePostHandler = (postId: string, isCommunityPost: boolean) => {
	const { updatePost: update } = useUpdatePost(postId)
	const { deletePost: remove } = useDeletePost(postId)

	const { updateCommunityPost } = useUpdateCommunityPost(postId)
	const { deleteCommunityPost } = useDeleteCommunityPost(postId)

	const updatePost = isCommunityPost ? updateCommunityPost : update
	const deletePost = isCommunityPost ? deleteCommunityPost : remove

	return {updatePost, deletePost}
}