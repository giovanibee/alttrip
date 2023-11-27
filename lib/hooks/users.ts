'use server'

import { getServerSession } from 'next-auth/next'
import { useQuery } from 'react-query'

const useFetchUser = () => useQuery('user', () => getServerSession())

export { useFetchUser }