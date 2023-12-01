'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import ky from 'ky-universal'
import { LatLngTuple } from '@/lib/types/geospatial'
import toast from 'react-hot-toast'

import { SortedChapters } from 'database/sortedChapters'

export interface Chapter {
	id: number
	description: string
	details: string
	latitude: number
	longitude: number
	name: string
	passcode: string | null
	order: number
	secretText: string | null
	storyId: number

	hasBeenCompleted?: boolean
}

const filterChaptersByDistance = (
	chapters: Chapter[],
	location: LatLngTuple,
) => {
	const [latitude, longitude] = location
	return chapters.filter((chapter) => {
		const distance = Math.sqrt(
			Math.pow(chapter.latitude - latitude, 2) +
				Math.pow(chapter.longitude - longitude, 2),
		)
		return distance < 0.1
	})
}

export interface FetchChapterProps {
	location?: LatLngTuple
	shouldFilterByDistance?: boolean
}
export const useFetchChapters = ({
	location,
	shouldFilterByDistance = false,
}: FetchChapterProps) =>
	useQuery({
		queryKey: ['chapters'],
		queryFn: async (): Promise<SortedChapters | null> => {
			try {
				let response = (
					(await ky
						.get('/api/auth/chapters', {
							headers: {
								'Content-Type': 'application/json',
							},
						})
						.json()) as { res: SortedChapters }
				).res

				if (!response) throw new Error('No response')
				if (shouldFilterByDistance && location) {
					response.incompleteChapters = filterChaptersByDistance(
						response.incompleteChapters,
						location,
					)
					response.completedChapters = filterChaptersByDistance(
						response.completedChapters,
						location,
					)
				}
				return response
			} catch (error) {
				console.error(error)
				return null
			}
		},
	})

export const useGetSecretText = () =>
	useMutation({
		mutationFn: async (id: number) => {
			try {
				const response = await ky.get('/api/auth/chapters/secret', {
					headers: {
						'Content-Type': 'application/json',
					},
					searchParams: { id },
				})
				const secretText = ((await response.json()) as { res: string })?.res
				if (secretText === undefined) throw new Error('No response')
				return secretText
			} catch (error) {
				console.error(error)
				return ''
			}
		},
	})

export interface VerifyPasscodeProps {
	chapterId: number
	passcode: string
}

export const useVerifyPasscode = () =>
	useMutation({
		mutationFn: async ({ chapterId, passcode }: VerifyPasscodeProps) => {
			try {
				const response = await ky.put('/api/auth/chapters/secret', {
					headers: {
						'Content-Type': 'application/json',
					},
					json: { chapterId, passcode },
				})
				const secretText = ((await response.json()) as { res: string | null })
					?.res
				if (!secretText) {
					toast.error('Invalid passcode')
				} else {
					toast.success('Correct!')
				}
				return secretText
			} catch (error) {
				console.error(error)
				toast.error('Server error')
				return null
			}
		},
	})

// export const useCreateChapters = () =>
// 	useMutation({
// 		mutationFn: () => {
// 			return fetch('/api/chapters', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					name: 'test',
// 				}),
// 			})
// 		},
// 	})

// export const useUpdateChapters = () =>
// 	useMutation({
// 		mutationFn: () => {
// 			return fetch('/api/chapters', {
// 				method: 'PUT',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					name: 'test',
// 				}),
// 			})
// 		},
// 	})
