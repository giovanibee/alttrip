import Form from '@/components/Authentication/form'
import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/BaseComponents'
import './style.scss'

export default function Login() {
	return (
		<Card id='login-card'>
			<CardHeader id='login-card-header'>
				Login ★
			</CardHeader>
			<CardBody>
				<Form type="login" />
			</CardBody>
			<CardFooter id='login-card-footer'>
				Don&apos;t have an account? <Link href="/register">Register here</Link>
			</CardFooter>
		</Card>
	)
}