import toast from 'react-hot-toast'

export const successUpload = (message: string) => {

	toast.success(message, {
		duration: 2000,
		style: {
			borderRadius: '10px',
			background: '#15151c',
			color: '#fff',
		},
	})

}