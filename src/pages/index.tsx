import { NextPage } from 'next'
import Register from '../components/screens/auth/register/Register'
import Login from '../components/screens/auth/login/Login'
import { useState } from 'react'
import CheckRoleAuth from '../providers/auth-provider/CheckRoleAuth'

const AuthPage: NextPage = () => {
	const [isLoginPage, setIsLoginPage] = useState<boolean>(true)

	const togglePage = () => {
		setIsLoginPage((prev) => !prev)
	}

	return isLoginPage ? (
		<CheckRoleAuth>
			<Login togglePage={togglePage} />
		</CheckRoleAuth>
	) : (
		<CheckRoleAuth>
			<Register togglePage={togglePage} />
		</CheckRoleAuth>
	)
}

export default AuthPage
