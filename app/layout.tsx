import React from 'react'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { MainHeader } from '@/components/Homepage'
import { Footer, Grommet, Main } from '@/components/BaseComponents'
import { NextAuthProvider, ReactQueryProvider } from '@/components/Misc'
import Loading from '@/app/loading'
import 'styles/globals.css'

const defaultFont = Inter({
	display: 'swap',
	subsets: ['latin'],
	weight: '400',
})

const title = 'alt trip 📍 🗺️ 📓'
const description = 'story-driven scavenger hunts'

export const metadata: Metadata = {
	title,
	description,
	metadataBase: new URL('https://alttrip.vercel.app'),
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<NextAuthProvider>
			<html lang="en">
				<body className={defaultFont.className}>
					<ReactQueryProvider>
						<Toaster />
						<Suspense fallback={<Loading />}>
							<Grommet>
								<MainHeader />
								<Main>{children}</Main>
								<Footer>
									<div
										style={{
											color: 'grey',
											display: 'block',
											margin: '0px 56px 28px auto',
										}}
									>
										⊛ hello.alttrip@gmail.com ⊛ made with love from las vegas,
										nv, usa © 2023
									</div>
								</Footer>
							</Grommet>
						</Suspense>
					</ReactQueryProvider>
				</body>
			</html>
		</NextAuthProvider>
	)
}
