'use client'

import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider