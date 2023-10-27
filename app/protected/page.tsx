'use client'

import SignOut from '@/components/sign-out'
// import { useDungeon } from 'lib/hooks'
import { Button } from 'components'

export default function Page() {
	// useDungeon()
	return (
		<div>
			<p>aaaahhh</p>
			<Button primary pad="medium">
					Create quest
				</Button>
			{/* <canvas id="dungeon-canvas" width="800" height="600"></canvas> */}
			<br/> <br />
			<SignOut />
		</div>
	)
}