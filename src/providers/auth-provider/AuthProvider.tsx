import React, { FC, PropsWithChildren, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { getAccessToken } from '@/services/auth/auth.helper'
import { useActions } from '@/hooks/useActions'
import Layout from '../../components/layout/Layout'
import { useAuth } from '@/hooks/useAuth'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user, isLoading } = useAuth()
	const { checkAuth, logout } = useActions()
	const { pathname } = useRouter()
	const [isChecked, setIsChecked] = React.useState(false)

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken && !isChecked) {
			checkAuth()
			setIsChecked(true)
		} else {
			setIsChecked(true)
		}
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (isChecked && !refreshToken && user) {
			logout()
		}
	}, [pathname, isChecked, user])

	if (!isChecked) return <div>Loading...</div>

	return pathname === '/' ? <>{children}</> : <Layout>{children}</Layout>
}

export default AuthProvider