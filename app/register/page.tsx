import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/BaseComponents'
import { SignUpForm } from '@/components/Authentication'

export default function Login() {
	return (
		<Card id='register-card'>
			<CardHeader id='register-card-header'>
				Sign Up ★
			</CardHeader>
			<CardBody>
				<SignUpForm />
			</CardBody>
			<CardFooter id='register-card-footer'>
				Already have an account? <Link href="/login">Login here</Link>
			</CardFooter>
		</Card>
	)
}
