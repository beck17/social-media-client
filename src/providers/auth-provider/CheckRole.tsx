import React, { FC, PropsWithChildren } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const CheckRole: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()

	const router = useRouter()

	const pushing = async () => {
		await router.replace('/')
	}

	if (user) return <>{children}</>

	router.pathname !== '/' && pushing()
	return null
}

export default CheckRole
