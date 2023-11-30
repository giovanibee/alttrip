import { useMemo, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Chapter, useGetSecretText, useVerifyPasscode } from '@/lib/hooks/chapters'
import { Button, Card, Layer, Input, CardHeader, CardBody, CardFooter } from '@/components/BaseComponents'
import './ChapterPopup.scss'
import { LoadingDots } from '@/components/Loading'

interface ChapterPopupProps {
  chapter: Chapter
  key: number
  isComplete?: boolean
}

export default function ChapterPopup ({ chapter, key, isComplete = false }: ChapterPopupProps) {
  const [isViewing, setIsViewing] = useState(false)
  const [passcode, setPasscode] = useState('')
  const {
    description,
    details,
    id: chapterId,
    name,
    order,
  } = chapter

  const { data: secret, isPending } = useGetSecretText()

  const {
    mutate: verifyPasscode,
    isPending: isPendingVerification
  } = useVerifyPasscode()

  // when passcode is verified, mark chapter as complete
  const secretSection = useMemo(() => {
    if (isPending || isPendingVerification) return <LoadingDots />
    return (
      isComplete
      ? <p>{secret}</p>
      : <>
          <Input
            name='passcode'
            onChange={(event) => setPasscode(event.target.value)}
            type='password'
          />
          <Button
            label="Verify"
            onClick={() => verifyPasscode({ chapterId, passcode })}
          />
        </>
      )
  }, [
    chapterId, isComplete, isPending, isPendingVerification, passcode, secret, verifyPasscode
  ])

  return (
    <Marker key={key} position={[chapter.latitude, chapter.longitude]}>
      {isViewing && (
        <Layer id='map-popup-layer'>
          <Card id={`map-popup-card-${key}`}>
            <CardHeader id={`map-popup-card-${key}-header`}>
              <span className='map-popup-card-header-order'>
                {`Chapter ${order + 1}`}
              </span>
             <span className='map-popup-card-header-name'>
               {name}
              </span>
            </CardHeader>
            <CardBody id={`map-popup-card-${key}-body`}>
              <p>{description}</p>
              <p>{details}</p>
              {secretSection}
            </CardBody>
            <CardFooter id={`map-popup-card-${key}-footer`}>
              <Button label="Close" onClick={() => setIsViewing(false)} />
            </CardFooter>
          </Card>
        </Layer>
      )}
      <Popup className='map-popup-mark'>
        <h3>Chapter {order + 1} - {name}</h3>
        <p>{description}</p>
        <Button
          label="View"
          onClick={() => setIsViewing(true)}
        />
      </Popup>
    </Marker>
  )
}