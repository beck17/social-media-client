import React, { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/useAuth'


const CheckRoleAuth: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()

	const router = useRouter()

	if (!user) return <>{children}</>

	router.pathname === '/' && router.replace('/feed')
	return null
}

export default CheckRoleAuth
