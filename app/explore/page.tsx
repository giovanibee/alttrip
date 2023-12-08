import dynamic from 'next/dynamic'
import Image from 'next/image'

const ExplorePage = dynamic(() => import('@/components/Explore/ExplorePage'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
})

export default function Page() {
	return <ExplorePage />
}
