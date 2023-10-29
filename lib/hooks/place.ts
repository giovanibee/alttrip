'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

export const useFetchPlaces = () =>
	useQuery({
		queryKey: ['places'],
		queryFn: () => {
			return fetch('/api/places', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'test',
				}),
			})
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
