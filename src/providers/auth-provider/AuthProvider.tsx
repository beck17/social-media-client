import React, { FC, PropsWithChildren, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { getAccessToken } from '../../services/auth/auth.helper'
import { useAuth } from '../../hooks/useAuth'
import { useActions } from '../../hooks/useActions'
import Layout from '../../components/layout/Layout'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()

	const { checkAuth, logout } = useActions()

	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname])

	if (pathname === '/') return <>{children}</>

	return <Layout>{children}</Layout>
}

export default AuthProvider
