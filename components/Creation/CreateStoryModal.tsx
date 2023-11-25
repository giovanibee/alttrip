import { Button, Card, CardBody, CardHeader, Layer } from '@/components/BaseComponents'
import { CreateStoryForm } from '@/components/Creation'
import './CreateStory.scss'

export default function CreateStoryModal ({
  closeModal = () => {},
  isOpen = false,
}) {
  if (!isOpen) return null
  return (
    <Layer id='create-story-modal' style={{ zIndex: 9999 }}>
      <Card id='create-story-modal-card'>
        <CardHeader>
          New story
          <Button
            label="X"
            onClick={closeModal}
            plain
          />
        </CardHeader>
        <CardBody>
          <CreateStoryForm />
        </CardBody>
      </Card>
    </Layer>
  )
}