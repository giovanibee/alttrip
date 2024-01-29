'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import ky from 'ky-universal'
import { LatLngTuple } from '@/lib/types/geospatial'
import toast from 'react-hot-toast'

import { SortedChapters } from 'database/sortedChapters'
import { queryClient } from '@/components/Misc/ReactQueryProvider'

export interface Story {
	description: string
	name: string
}

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
	question: string | null

	hasBeenCompleted?: boolean
	story?: Story
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
export function useFetchChapters({
	location,
	shouldFilterByDistance = false,
}: FetchChapterProps) {
	return useQuery({
		queryKey: ['chapters'],
		queryFn: async (): Promise<SortedChapters | null> => {
			try {
				const response = (
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
}

export const useGetSecretText = (id: number) =>
	useQuery({
		queryKey: [`secretText-${id}`],
		queryFn: async () => {
			try {
				if (isNaN(id)) throw new Error('No id')
				const response = await ky.get('/api/auth/chapters/secret', {
					headers: { 'Content-Type': 'application/json' },
					searchParams: { chapterId: id },
				})

				const secretText = ((await response?.json()) as string) || null
				if (!secretText) return ''
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
					headers: { 'Content-Type': 'application/json' },
					json: { chapterId, passcode },
				})
				// TODO: clean this up
				const secretText = (await response.json()) as
					| string
					| null
					| { status: number }
				if (!secretText || (secretText as { status: number }).status === 400) {
					return toast.error('Invalid passcode')
				}
				toast.success('Correct!')
				queryClient.setQueryData(['secretText'], secretText)
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
