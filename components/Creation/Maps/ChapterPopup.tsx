import { useMemo, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Chapter } from '@/lib/hooks/chapters'
import { Button, Card, Layer, Input, CardHeader, CardBody, CardFooter } from '@/components/BaseComponents'
import './ChapterPopup.scss'

export default function ChapterPopup ({ chapter, key }: { chapter: Chapter, key: number }) {
  const [isViewing, setIsViewing] = useState(false)
  const {
    name,
    description,
    details,
    order,
} = chapter
  const {
    data: secret, isFetching, refetch
  } = {
    data: chapter.secretText,
    isFetching: false,
    refetch: () => {}
  }

  const secretSection = useMemo(() => {
    if (isFetching) return <p>loading</p>
    return (
      secret
      ? <p>{secret}</p>
      : <>
          <Input name='passcode' type='password' />
          <Button label="Verify" onClick={refetch} />
        </>
        )
  }, [isFetching, refetch, secret])

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
              <Button
                label="Close"
                onClick={() => setIsViewing(false)}
              />
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