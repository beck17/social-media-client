import React, { FC } from 'react'
import Navbar from './navbar/Navbar'
import LeftSidebar from './leftSidebar/LeftSidebar'
import RightSidebar from './rightSidebar/RightSidebar'

type Prop = {
	children: JSX.Element
}

const Layout: FC<{ children: Prop }> = ({ children }) => {
	return (
		<>
			<Navbar />
			<div style={{ display: 'flex' }}>
				<LeftSidebar />
				<div style={{ flex: 6 }}>{children}</div>
				<RightSidebar />
			</div>
		</>
	)
}

export default Layout
