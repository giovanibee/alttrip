import { Marker, Popup } from 'react-leaflet'
import { Chapter } from '@/lib/hooks/chapters'
import { Button } from '@/components/BaseComponents'

export default function Marks ({ chapters = [] }: { chapters: Chapter[] | null }) { 
  return chapters?.length && chapters?.map((chapter) => (
    <Marker key={chapter.id} position={[chapter.latitude, chapter.longitude]}>
      <Popup>
        <p>{chapter.name}</p>
        <p>Description: {chapter.description}</p>
        <Button
          label="View"
          onClick={() => console.log('view chapter')}
        />
      </Popup>
    </Marker>
  ))
}