import { Button, Card, CardBody, CardHeader, Layer } from '@/components/BaseComponents'
import { CreateStoryForm } from '@/components/Creation'
import './CreateStory.scss'

const CreateStoryModal = ({
  closeModal = () => {},
  isOpen = false,
  latitude = 0,
  longitude = 0,
}) => {
  if (!isOpen) return null
  return (
    <Layer id='create-story-modal' style={{ zIndex: 9999 }}>
      <Card id='create-story-modal-card'>
        <CardHeader>
          New story
          <Button
            id='create-story-modal-close-button'
            label="X"
            onClick={closeModal}
            plain
          />
        </CardHeader>
        <CardBody>
          <CreateStoryForm latitude={latitude} longitude={longitude} />
        </CardBody>
      </Card>
    </Layer>
  )
}

export default CreateStoryModal