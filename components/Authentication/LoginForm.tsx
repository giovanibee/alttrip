'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Form } from 'antd'
import { Button, Input } from '@/components/BaseComponents'
import { LoadingDots } from '@/components/Loading/LoadingDots'
import { useRouter } from 'next/navigation'
import './style.scss'

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	// TODO: Replace with any in event type
	const onSubmit = async (event: any) => {
		event.preventDefault()
		setIsLoading(true)
		const { email, password = '' } = event.value as {
			email: string
			password: string
		}

		if (password?.length < 8) {
			toast.error('Password must be at least 8 characters long.')
			return setIsLoading(false)
		}

		const response = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})
		if (!response?.error) return router.push('/explore')
		console.error(response?.error)
		setIsLoading(false)
		toast.error('Invalid login credentials--please try again.')
	}

	return (
		<Form onFinish={onSubmit}>
			<Form.Item
				name="email"
				htmlFor="email"
				label="Email address"
				rules={[
					{
						required: true,
						message: 'Please input a name for your story',
					}
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="password" htmlFor="password" label="Password" rules={[
					{
						required: true,
						message: 'Please input a name for your story',
					}
				]}>
				<Input />
			</Form.Item>
			{isLoading ? (
				<LoadingDots />
			) : (
				<Button disabled={isLoading} id="login-submit-button" htmlType='submit'>
					Sign In
				</Button>
			)}
		</Form>
	)
}
