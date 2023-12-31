import { useEffect, useMemo, useState } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import Link from 'next/link'

import {
	Button,
	Card,
	Layer,
	Input,
	CardHeader,
	CardBody,
	CardFooter,
	InfoField,
} from '@/components/BaseComponents'
import { LoadingDots } from '@/components/Loading'
import {
	Chapter,
	useGetSecretText,
	useVerifyPasscode,
} from '@/lib/hooks/chapters'

import { roundNumber } from '@/lib/helpers'

import 'leaflet/dist/leaflet.css'
import './ChapterPopup.scss'

interface ChapterPopupProps {
	chapter: Chapter
	isComplete?: boolean
}

export default function ChapterPopup({
	chapter,
	isComplete = false,
}: ChapterPopupProps) {
	const [isViewing, setIsViewing] = useState(false)
	const [showDetails, setShowDetails] = useState(false)
	const [passcode, setPasscode] = useState('')
	const { description, details, id: chapterId, latitude, longitude, name, order, question } = chapter

	const { data: secret, isPending, refetch } = useGetSecretText(chapter.id)
	const { mutate: verifyPasscode, isPending: isPendingVerification } =
		useVerifyPasscode()

	useEffect(() => {
		if (!secret || typeof secret !== 'string') refetch()
	}, [isViewing, secret])

	// when passcode is verified, mark chapter as complete
	const secretSection = useMemo(() => {
		if (isPending || isPendingVerification) {
			return <LoadingDots className='chapter-popup-loading' />
		} else if (!secret || typeof secret !== 'string') return null
		return isComplete
			? <p>Secret: {secret}</p>
			: (
				<>
					<p>{question || 'What is the passcode?'}</p>
					<Input
						name="passcode"
						onChange={(event) => setPasscode(event.target.value)}
						type="password"
					/>
					<Button
						className="verify-button"
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
		question,
		secret,
		verifyPasscode,
	])

	return (
		<Marker
			icon={new Icon({
				iconUrl: isComplete
					? '/icons/completed-icon.png'
					: '/icons/default-viewed-icon.png',
				iconSize: [25, 41],
			})}
			position={[chapter.latitude, chapter.longitude]}
		>
			{isViewing && (
				<Layer className="map-popup-layer">
					<Card className="map-popup-card">
						<CardHeader className={`map-popup-card-header`}>
							<span className="map-popup-card-header-order">
								{`Chapter ${order + 1}`}
							</span>
							<span className="map-popup-card-header-name">{name}</span>
						</CardHeader>
						<CardBody className={`map-popup-card-body`}>
							<InfoField label='Description' value={description} />
							{secretSection}
							{!isComplete && (
								showDetails
								? <InfoField label='Hints / Details' value={details} />
								: <Button
										className="hint-button"
										label="Need a hint?"
										onClick={() => setShowDetails(true)}
									/>
							)}
						</CardBody>
						<CardFooter className={`map-popup-card-footer`}>
							<Button
								className="close-button"
								label="Close"
								onClick={() => setIsViewing(false)}
							/>
						</CardFooter>
					</Card>
				</Layer>
			)}
			<Popup className="map-popup-mark">
				<h3>
					Chapter {order + 1} - {name}
				</h3>
				<p className='map-popup-description'>{description}</p>
				<div className='coordinates-link'>
					<span>Directions: {' '}</span>
					<Link
						href={`http://www.google.com/maps/place/${latitude},${longitude}`}
						target='_blank'
					>
						{roundNumber(latitude, 2)}, {roundNumber(longitude, 2)}
					</Link>
				</div>
				<Button
					className='view-button'
					label="View"
					onClick={() => setIsViewing(true)}
				/>
			</Popup>
		</Marker>
	)
}
