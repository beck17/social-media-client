import toast from 'react-hot-toast'
import { AxiosResponse } from 'axios'

export const toastPromise = async (promise: Promise<AxiosResponse>) => {
	await toast.promise(promise,
		{
			loading: 'Загрузка...',
			success: 'Успешно!',
			error: 'Произошла ошибка!',
		},{
			style: {
				borderRadius: '10px',
				background: '#15151c',
				color: '#fff',
				whiteSpace: 'nowrap',
			},
			success: {
				duration: 2000,
			},
		}
	);
}