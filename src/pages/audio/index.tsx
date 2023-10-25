import { NextPage } from 'next'

import CheckRole from '../../providers/auth-provider/CheckRole'

import Audio from '../../components/screens/audio'

const AudioPage: NextPage = () => {
	return (
		<CheckRole>
			<Audio />
		</CheckRole>
	)
}

export default AudioPage
