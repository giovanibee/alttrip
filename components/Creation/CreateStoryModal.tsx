import { Modal } from '@/components/BaseComponents'
import { CreateStoryForm } from '@/components/Creation'

import './CreateStory.scss'

export function CreateStoryModal ({
  closeModal = () => {},
  isOpen = false,
  latitude = 0,
  longitude = 0,
}) {
  // TODO: add a popup to ask if the user wants to save the story before closing
  if (!isOpen) return null
  return (
    <Modal
      classNames={{
        header: 'create-story-modal-header',
        mask: 'create-story-modal',
        footer: 'create-story-modal-footer',
      }}
      closeIcon
      open={isOpen}
      style={{ zIndex: 9999 }}
      title='New story'
      onCancel={closeModal}
      width='100%'
      wrapClassName='create-story-modal'
    >
      <CreateStoryForm
        closeModal={closeModal}
        latitude={latitude}
        longitude={longitude}
      />
    </Modal>
  )
}