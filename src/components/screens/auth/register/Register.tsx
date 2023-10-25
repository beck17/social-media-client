import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'
import { useActions } from '../../../../hooks/useActions'
import { IRegisterUser } from '../../../../types/user.interface'

import styles from '@/assets/styles/screens/Auth.module.scss'

type Inputs = {
	firstName: string
	lastName: string
	phoneNumber: number
	password: string
}

const Register: FC = ({ togglePage }) => {
	const { isLoading } = useSelector((state) => state.user)

	const { register } = useActions()

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IRegisterUser> = (data) => {
		register(data)
		console.log(data)
		reset()
	}

	return (
		<div className={styles.auth}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h2>Регистрация</h2>
				<Input
					placeholder="Имя"
					{...formRegister('firstName', {
						required: 'Это обязательное поле',
					})}
					error={errors.firstName?.message}
				/>
				<Input
					placeholder="Фамилия"
					{...formRegister('lastName', {
						required: 'Это обязательное поле',
					})}
					error={errors.lastName?.message}
				/>
				<Input
					placeholder="Номер телефона"
					{...formRegister('phoneNumber', {
						required: 'Это обязательное поле',
					})}
					error={errors.phoneNumber?.message}
					type="number"
				/>
				<Input
					placeholder="Пароль"
					{...formRegister('password', {
						required: 'Это обязательное поле',
					})}
					error={errors.password?.message}
					type="password"
				/>
				<Button>Зарегистрироваться</Button>
				<p>
					Уже есть аккаунт?
					<span onClick={togglePage}>Войти</span>
				</p>
			</form>
		</div>
	)
}

export default Register
