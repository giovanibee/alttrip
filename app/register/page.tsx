import Image from 'next/image'
import Form from '@/components/Authentication/form'
import Link from 'next/link'

export default function Login() {
	return (
		<div>
			<div>
				<Link href="/">
					<Image
						src="/logo.png"
						priority
						alt="Logo"
						className="h-10 w-10 rounded-full"
						width={20}
						height={20}
					/>
				</Link>
				<h3 className="text-xl font-semibold">Sign Up</h3>
				<p className="text-sm text-gray-500">
					Create an account with your email and password
				</p>
			</div>
			<Form type="register" />
		</div>
	)
}
