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

export const useFetchChapters = (location?: LatLngTuple) =>
	useQuery({
		queryKey: ['chapters'],
		queryFn: (): Promise<Chapter[]> | undefined => location && ky.get('/api/auth/chapters', {
				headers: {
					'Content-Type': 'application/json',
				},
				json: {
					latitude: location[0],
					longitude: location[1],
				}
			}).json(),
	})

// export const useCreatePlace = () =>
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

// export const useUpdatePlace = () =>
// 	useMutation({
// 		mutationFn: () => {
// 			return fetch('/api/places', {
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
