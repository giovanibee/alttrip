import { Card, CardHeader, CardBody } from '@/components/BaseComponents'
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
		</Card>
	)
}
