import React, { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

const CheckRoleAuth: FC<PropsWithChildren> = ({ children }) => {
	const { user, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && user) {
			router.replace('/feed')
		}
	}, [user, isLoading, router])

	if (isLoading || user) return null

	return <>{children}</>
}

export default CheckRoleAuth