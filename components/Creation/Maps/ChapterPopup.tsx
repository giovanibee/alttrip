import { Fragment, useMemo, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import {
	Chapter,
	useGetSecretText,
	useVerifyPasscode,
} from '@/lib/hooks/chapters'
import {
	Button,
	Card,
	Modal,
	Input,
} from '@/components/BaseComponents'
import { LoadingDots } from '@/components/Loading/LoadingDots'

import './ChapterPopup.scss'

interface ChapterPopupProps {
	chapter: Chapter
	key: number
	isComplete?: boolean
}

export function ChapterPopup({
	chapter,
	key,
	isComplete = false,
}: ChapterPopupProps) {
	const [isViewing, setIsViewing] = useState(false)
	const [passcode, setPasscode] = useState('')
	const { description, details, id: chapterId, name, order } = chapter

	const { data: secret, isPending } = useGetSecretText()

	const { mutate: verifyPasscode, isPending: isPendingVerification } =
		useVerifyPasscode()

	// when passcode is verified, mark chapter as complete
	const secretSection = useMemo(() => {
		if (isPending || isPendingVerification) return <LoadingDots />
		return isComplete ? (
			<p>{secret}</p>
		) : (
			<>
				<Input
					name="passcode"
					onChange={(event) => setPasscode(event.target.value)}
					type="password"
				/>
				<Button
					label="Verify"
					onClick={() => verifyPasscode({ chapterId, passcode })}
				/>
			</>
		)
	}, [
		chapterId,
		isComplete,
		isPending,
		isPendingVerification,
		passcode,
		secret,
		verifyPasscode,
	])

	return (
		<Marker key={key} position={[chapter.latitude, chapter.longitude]}>
			{isViewing && (
				<Modal id="map-popup-layer">
					<Card id={`map-popup-card-${key}`} title={(
						<>
							<span className="map-popup-card-header-order">
								{`Chapter ${order + 1}`}
							</span>
							<span className="map-popup-card-header-name">{name}</span>
						</>
					)}
					actions={[
						<Button title="Close" onClick={() => setIsViewing(false)} key='1' />
					]}
					>

						<div id={`map-popup-card-${key}-body`}>
							<p>{description}</p>
							<p>{details}</p>
							{secretSection}
						</div>
					</Card>
				</Modal>
			)}
			<Popup className="map-popup-mark">
				<h3>
					Chapter {order + 1} - {name}
				</h3>
				<p>{description}</p>
				<Button title="View" onClick={() => setIsViewing(true)} />
			</Popup>
		</Marker>
	)
}
