import Form from '@/components/form'
import Link from 'next/link'

export default function Login() {
	return (
		<div className="flex">
			<div className="flex">
				<Link href="/">Return to home</Link>
				<h3 className="text-xl font-semibold">Sign In</h3>
				<p className="text-sm text-gray-500">
					Use your email and password to sign in
				</p>
			</div>
			<Form type="login" />
		</div>
	)
}
