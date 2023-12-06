import { ChapterPopup } from './ChapterPopup'
import { SortedChapters } from 'database/sortedChapters'

export function Marks ({ chapters = null }: { chapters: SortedChapters | null }) { 
  return (
    <div>
      {chapters?.incompleteChapters.length &&
          chapters?.incompleteChapters.map(
            (chapter, id) => <ChapterPopup chapter={chapter} key={id} />
            )}
      {chapters?.completedChapters.length && chapters?.completedChapters.map(
          (chapter, id) => <ChapterPopup chapter={chapter} key={id} isComplete />
        )}
    </div>
  )
}