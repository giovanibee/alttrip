import { useMutation, useQuery } from '@tanstack/react-query'
import ky from 'ky-universal'
import { LatLngTuple } from 'lib/types/geospatial'

export interface Story {
	id: number
	description: string
	name: string
}

export const useFetchStories = (location?: LatLngTuple) =>
	useQuery({
		queryKey: ['stories'],
		queryFn: (): Promise<Story[]> | null => {
			if (!location) return null
			return ky
				.get('/api/auth/stories', {
					headers: {
						'Content-Type': 'application/json',
					},
					json: {
						latitude: location[0],
						longitude: location[1],
					},
				})
				.json()
		},
	})

export const useCreateStories = () =>
	useMutation({
		mutationFn: () => {
			return fetch('/api/stories', {
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

export const useUpdateStories = () =>
	useMutation({
		mutationFn: () => {
			return fetch('/api/stories', {
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
