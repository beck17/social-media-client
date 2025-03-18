export const validatePost = (data: { text: string; image?: string }) => {
	const { text, image } = data
	if (text.trim() === '' && image === undefined) {
		throw new Error('Добавьте текст или фотографию')
	}
}