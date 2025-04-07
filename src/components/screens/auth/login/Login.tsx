import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '@/hooks/user/useActions'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import { IPhonePassword } from '@/types/user.interface'

import styles from '@/assets/styles/screens/Auth.module.scss'


interface Props {
	togglePage?: () => void
}

const Login: FC<Props> = ({ togglePage }) => {
	const [error, setError] = useState<boolean>(false)
	const { login } = useActions()

	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<IPhonePassword>()

	const onSubmit: SubmitHandler<IPhonePassword> = (data) => {
		try {
			login(data)
			reset()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2>Вход</h2>
				<Input
					placeholder='Номер телефона'
					type='number'
					{...register('phoneNumber', {
						required: 'Это поле обязательное',
					})}
					// error={errors.phoneNumber?.message}
					error={errors.root?.message}
				/>
				<Input
					placeholder='Пароль'
					type='password'
					{...register('password', {
						required: 'Это поле обязательное',
					})}
					error={errors.password?.message}
				/>
				<Button>Войти</Button>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<p>
						Нет аккаунта?
						<span onClick={togglePage}>Зарегистрироваться</span>
					</p>
					{error && (
						<p style={{ textAlign: 'left', color: 'red' }}>
							Неверный логин или пароль
						</p>
					)}
				</div>
			</form>
		</div>
	)
}

export default Login
