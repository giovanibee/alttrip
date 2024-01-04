import dynamic from 'next/dynamic'

const ExplorePage = dynamic(() => import('@/components/Explore/ExplorePage'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
})

export default function Page() {
	return <ExplorePage />
}
