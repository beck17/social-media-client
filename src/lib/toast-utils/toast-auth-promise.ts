import toast from 'react-hot-toast'
import { IUserResponse } from '@/types/user.interface'

export const toastAuthPromise = async (promise: Promise<IUserResponse>) => {
	await toast.promise(promise,
		{
			loading: 'Загрузка...',
			success: 'Вы успешно вошли!',
			error: 'Неверный номер или пароль!',
		}, {
			style: {
				borderRadius: '10px',
				background: '#15151c',
				color: '#fff',
				whiteSpace: 'nowrap',
			},
			success: {
				duration: 2000,
			},
		},
	)
}