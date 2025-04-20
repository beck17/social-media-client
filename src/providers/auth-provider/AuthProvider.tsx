import React, { FC, PropsWithChildren, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { getAccessToken } from '@/services/auth/auth.helper'

import { useAuth } from '@/hooks/user/useAuth'
import { useActions } from '@/hooks/user/useActions'

import Layout from '../../components/layout/Layout'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const { pathname } = useRouter()
	const [isChecked, setIsChecked] = React.useState<boolean>(false)

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