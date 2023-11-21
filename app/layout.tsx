import React from 'react'
// These styles apply to every route in the application
import { Grommet } from 'grommet'
import { Metadata } from 'next'
import Script from 'next/script'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import 'styles/globals.css'
import { MainHeader } from '@/components/Homepage'
import { Footer, Main } from '@/components/BaseComponents'
import { ReactQueryProvider } from '@/components/Misc'

const poppins = Poppins({
  display: 'swap',
	subsets: ['latin'],
  weight: '400',
})

const title = 'alt trip'
const description = 'A local bucketlist for places that make you happy (:'

export const metadata: Metadata = {
	title,
	description,
	twitter: {
		card: 'summary_large_image',
		title,
		description,
	},
	metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
	themeColor: '#FFF',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
					integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
					crossOrigin=""
				/>
				<link
					rel="preload"
					as="image"
					type="image/png"
					href="/public/logo/logo.png"
				/>
				<link
					rel="preload"
					href="/fonts/Aloja-Extended.woff"
					as="font"
					type="font/woff"
					crossOrigin=""
				/>
				<Script
					src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
					integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
					crossOrigin=""
				/>
			</head>
			<body className={poppins.className}>
					<ReactQueryProvider>
						<Toaster />
						<Grommet>
							<MainHeader />
							<Main style={{ margin: '56px' }}>
								{children}
							</Main>
							<Footer>
								<div style={{ color: 'grey', display: 'block', margin: '0px 56px 28px auto' }}>
								⊛ hello.alttrip@gmail.com ⊛ made with love from las vegas, nv, usa © 2023
								</div>
							</Footer>
						</Grommet>
					</ReactQueryProvider>
			</body>
		</html>
	)
}
