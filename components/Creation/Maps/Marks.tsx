import { Chapter } from '@/lib/hooks/chapters'
import ChapterPopup from './ChapterPopup'

export default function Marks ({ chapters = [] }: { chapters: Chapter[] | null }) { 
  return chapters?.length && chapters?.map(
    (chapter, id) => <ChapterPopup chapter={chapter} key={id} />
  )
}