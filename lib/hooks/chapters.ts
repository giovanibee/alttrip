import { useMutation, useQuery } from '@tanstack/react-query'
import ky from 'ky-universal'
import { LatLngTuple } from 'leaflet'

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
}

export const useFetchChapters = (location: LatLngTuple) =>
	useQuery({
		queryKey: ['chapters'],
		queryFn: async (): Promise<unknown | null> => {
			const [latitude, longitude] = location || []
			if (Math.abs(latitude) < 1 || Math.abs(longitude) < 1) {
				console.log('booooooo')
				return null
			}
			try {
				let response = await ky.get('/api/auth/chapters', {
					headers: {
						'Content-Type': 'application/json',
					}
				}).json() as { res: Chapter[] }
				console.log('response in fetchchapters', response)
				// response = response.filter((chapter) => {
				// 	const distance = Math.sqrt(
				// 		Math.pow(chapter.latitude - latitude, 2) + Math.pow(chapter.longitude - longitude, 2)
				// 	)
				// 	return distance < 0.1
				// })
				// TODO: fil
				if (!response?.res) throw new Error('no response') 
				return response.res
			} catch (error) {
				console.log('got an error')
				console.error(error)
				return null
			}
		}})

export const useCreateChapters = () =>
	useMutation({
		mutationFn: () => {
			return fetch('/api/chapters', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'test',
				}),
			})
		},
	})

export const useUpdateChapters = () =>
	useMutation({
		mutationFn: () => {
			return fetch('/api/chapters', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'test',
				}),
			})
		},
	})
