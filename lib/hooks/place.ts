import { useMutation, useQuery } from 'react-query'

const fetchPlaces = async () => {
	const response = await fetch('localhost:3000/api/places', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const body = await response.json()
	console.log('response', body)
	return body
}

export const useFetchPlaces = () =>
	useQuery({
		queryKey: ['places'],
		queryFn: async () => {
			const response = await fetchPlaces()
			console.log('response', response)
			return response
		},
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
