import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const NameLoader = () => {
	return (
		<SkeletonTheme baseColor='#202020' highlightColor='#444'>
			<p>
				<Skeleton count={3} />
			</p>
		</SkeletonTheme>
	)
}

