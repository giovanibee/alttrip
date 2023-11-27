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
		queryFn: async (): Promise<Chapter[] | null> => {
			const [latitude, longitude] = location || []
			if (!latitude || !longitude) return null
			console.log('location', location)
			return ky.get('/api/auth/chapters', {
				headers: {
					'Content-Type': 'application/json',
				},
				json: { latitude, longitude }
			}).json()
		},
	})

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
