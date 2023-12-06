import React from 'react'
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
					<React.Fragment key={id}>
						<ChapterPopup chapter={chapter} key={id} />
					</React.Fragment>
				))}
			{chapters?.completedChapters &&
				chapters?.completedChapters.map((chapter, id) => (
					<React.Fragment key={id}>
						<ChapterPopup chapter={chapter} key={id} isComplete />
					</React.Fragment>
				))}
		</>
	)
}
