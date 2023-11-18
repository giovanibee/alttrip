import { useMutation, useQuery } from '@tanstack/react-query'
import ky from 'ky-universal'

export const useFetchPlaces = () =>
	useQuery({
		queryKey: ['places'],
		queryFn: () => ky.get('/api/auth/places', {
				headers: {
					'Content-Type': 'application/json',
				},
			}).json(),
	})

export const useCreatePlace = () =>
	useMutation({
		mutationFn: () => {
			return fetch('/api/places', {
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

export const useUpdatePlace = () =>
	useMutation({
		mutationFn: () => {
			return fetch('/api/places', {
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
