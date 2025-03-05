import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

import { ConversationService } from '@/services/messanger/conversation.service'


export const useCreateConversation = (id: string) => {
	const router = useRouter()

	const { mutateAsync: createConversation } = useMutation(
		`create conversation with ${id}`,
		(id: string) => ConversationService.createConversation(id),
		{
			async onSuccess({ data }) {
				await router.push(`/im/${data?._id}?withId=${id}`)
			},
		},
	)

	return async (id: string) => {
		await createConversation(id)
	}
}