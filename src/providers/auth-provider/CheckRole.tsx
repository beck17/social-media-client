import React, { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/user/useAuth'

const CheckRole: FC<PropsWithChildren> = ({ children }) => {
	const { user, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !user && router.pathname !== '/') {
			router.replace('/')
		}
	}, [user, isLoading, router])

	if (isLoading) return <div>Loading...</div>

	return user ? <>{children}</> : null
}

export default CheckRole