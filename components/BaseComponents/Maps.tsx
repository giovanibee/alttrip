import dynamic from 'next/dynamic'
import { memo } from 'react'
import {
	MapContainerProps,
	TileLayerProps,
	PopupProps,
	PolygonProps,
	MarkerProps,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export const MapContainer = memo(
	dynamic<MapContainerProps>(
		() => import('react-leaflet').then((mod) => mod.MapContainer),
		{ ssr: false },
	),
)
export const TileLayer = dynamic<TileLayerProps>(
	() => import('react-leaflet').then((mod) => mod.TileLayer),
	{ ssr: false },
)

export const Polygon = dynamic<PolygonProps>(
	() => import('react-leaflet').then((mod) => mod.Polygon),
	{ ssr: false },
)

export const Marker = dynamic<MarkerProps>(
	() => import('react-leaflet').then((mod) => mod.Marker),
	{ ssr: false },
)

export const Popup = dynamic<PopupProps>(
	() => import('react-leaflet').then((mod) => mod.Popup),
	{ ssr: false },
)
