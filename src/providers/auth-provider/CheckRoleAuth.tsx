import React, { FC, PropsWithChildren } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

const CheckRoleAuth: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()

	const router = useRouter()

	if (!user) return <>{children}</>

	router.pathname === '/' && router.replace('/feed')
	return null
}

export default CheckRoleAuth
