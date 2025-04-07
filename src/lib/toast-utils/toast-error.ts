import toast from 'react-hot-toast'

export const toastError = (errorText: string) => {

	toast.error(errorText, {
		duration: 2000,
		style: {
			borderRadius: '10px',
			background: '#15151c',
			color: '#fff',
			whiteSpace: 'nowrap',
		},
	})

}