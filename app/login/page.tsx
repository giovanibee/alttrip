import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/BaseComponents'
import { LoginForm } from '@/components/Authentication'

export default function Login() {
	return (
		<Card id='login-card'>
			<CardHeader id='login-card-header'>
				Login ★
			</CardHeader>
			<CardBody id='login-card-body'>
				<LoginForm />
			</CardBody>
			<CardFooter id='login-card-footer'>
				Don&apos;t have an account? <Link href="/register">Sign up here</Link>
			</CardFooter>
		</Card>
	)
}