import ChapterPopup from './ChapterPopup'
import { SortedChapters } from 'database/sortedChapters'

export default function Marks({
	chapters = null,
}: {
	chapters: SortedChapters | null
}) {
	return (
		<>
			{chapters?.incompleteChapters &&
				chapters?.incompleteChapters.map((chapter, id) => (
					<ChapterPopup chapter={chapter} key={id} />
				))}
			{chapters?.completedChapters &&
				chapters?.completedChapters.map((chapter, id) => (
					<ChapterPopup chapter={chapter} key={id} isComplete />
				))}
		</>
	)
}
