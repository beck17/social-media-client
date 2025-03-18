import { useCallback, useState } from 'react'

export enum SectionState {
	friends = 'friends',
	subscribers = 'subscribers',
}

export const useSectionSwitch = (initial: SectionState) => {
	const [section, setSection] = useState(initial)

	const toggle = useCallback(() => {
		setSection(prev => prev === SectionState.friends
			? SectionState.subscribers
			: SectionState.friends)
	}, [])

	return {section, toggle}
}