import Link from 'next/link'
import { Card } from '@/components/BaseComponents'
import { LoginForm } from '@/components/Authentication'

export default function Login() {
	return (
		<Card
			actions={[
				<div id='login-card-footer' key='1'>
					Don&apos;t have an account? <Link href="/register">Sign up here</Link>
				</div>
			]}
			id='login-card'
			title='Login ★'
		>
				Login ★
			<div id='login-card-body'>
				<LoginForm />
			</div>
		</Card>
	)
}