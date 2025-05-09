import React, { FC, PropsWithChildren } from 'react'

import Navbar from './navbar/Navbar'
import LeftSidebar from '@/components/layout/left-sidebar/LeftSidebar'


const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Navbar />
			<div style={{ display: 'flex',maxWidth: "1024px", margin: "0 auto" }}>
				<LeftSidebar />
				<div style={{ flex: 9,  margin: "20px 0" }}>{children}</div>
			</div>
		</>
	)
}

export default Layout
