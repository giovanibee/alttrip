'use client'

import { useQuery } from '@tanstack/react-query'
import { generateRandomDungeon } from './dungeon-generator/map'

export const createQuest = () => useMutation({
  mutationFn: () => {
    return fetch('/api/quest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'test'
      })
    })
  }
})

export const useDungeon = () => useQuery({
  queryKey: ['dungeon-canvas'],
  queryFn: () => {
    const canvas = document.getElementById('dungeon-canvas') as HTMLCanvasElement
    generateRandomDungeon(canvas)
    return canvas
  }
})