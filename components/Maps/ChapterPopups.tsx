import React from 'react'
import ChapterPopup from './ChapterPopup'
import { SortedChapters } from 'database/sortedChapters'

interface MarksProps {
	chapters: SortedChapters | null
}

export function Marks({ chapters = null }: MarksProps) {
	return (
		<>
			{chapters?.incompleteChapters &&
				chapters?.incompleteChapters.map((chapter, id) => (
					<React.Fragment key={id}>
						<ChapterPopup chapter={chapter} />
					</React.Fragment>
				))}
			{chapters?.completedChapters &&
				chapters?.completedChapters.map((chapter, id) => (
					<React.Fragment key={id}>
						<ChapterPopup chapter={chapter} isComplete />
					</React.Fragment>
				))}
		</>
	)
}
