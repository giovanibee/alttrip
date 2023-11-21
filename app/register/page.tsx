import Form from '@/components/Authentication/form'
import { Card, CardHeader, CardBody } from '@/components/BaseComponents'
import './style.scss'

export default function Login() {
	return (
		<Card id='register-card'>
			<CardHeader id='register-card-header'>
				Sign Up ★
			</CardHeader>
			<CardBody>
				<Form type="register" />
			</CardBody>
		</Card>
	)
}
