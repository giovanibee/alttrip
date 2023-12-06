import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Layer,
} from '@/components/BaseComponents'
import { CreateStoryForm } from '@/components/Explore'

import './CreateStory.scss'

export function CreateStoryModal({
	closeModal = () => {},
	isOpen = false,
	latitude = 0,
	longitude = 0,
}) {
	// TODO: add a popup to ask if the user wants to save the story before closing
	if (!isOpen) return null
	return (
		<Layer id="create-story-modal" style={{ zIndex: 9999 }}>
			<Card id="create-story-modal-card">
				<CardHeader>
					New story
					<Button
						id="create-story-modal-close-button"
						label="X"
						onClick={closeModal}
						plain
					/>
				</CardHeader>
				<CardBody>
					<CreateStoryForm
						closeModal={closeModal}
						latitude={latitude}
						longitude={longitude}
					/>
				</CardBody>
			</Card>
		</Layer>
	)
}
