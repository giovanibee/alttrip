'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import ky from 'ky'
import { Form } from 'antd'
import { useRouter } from 'next/navigation'
import { LoadingDots } from '@/components/Loading/LoadingDots'
import { Button, FormField, Input } from '@/components/BaseComponents'
import './style.scss'

export default function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const onSubmit = async (event: FormExtendedEvent) => {
		event.preventDefault()
		setIsLoading(true)
		const { email, nameOfUser, password, confirmPassword, inviteCode } = event.value

		if (password !== confirmPassword) {
			toast.error('Passwords do not match.')
			return setIsLoading(false)
		}

		let response

		try {
			response = await ky.post('/api/auth/user', {
				json: { email, name: nameOfUser, password, inviteCode },
			})
			if (response.status === 201) {
				toast.success('Account created! You can now sign in.')
				setTimeout(() => router.push('/login'), 2000)
			}
		} catch (error: Error | any) {
			switch (error?.response?.status) {
				case 400:
					toast.error('Field is missing')
					break
				case 409:
					toast.error('Email already in use')
					break
				case 401:
					toast.error('Invalid invite code')
					break
				case 410:
					toast.error('Invite code already redeemed')
					break
				default:
					toast.error('Server error')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form onFinish={onSubmit} className="flex">
			<Form.Item name="email" htmlFor="email" label='Email address' rules={[
					{
						required: true,
						message: 'Please input a valid email address',
					}
				]}>
				<Input />
			</Form.Item>
			<Form.Item name="nameOfUser" htmlFor="name" label="Name" rules={[
					{
						required: true,
						message: 'Please input a name',
					}
				]}>
				<Input />
			</Form.Item>
			<Form.Item name="password" htmlFor="password" label="Password" rules={[
					{
						required: true,
						message: 'Please input a password',
					}
				]}>
				<Input type='password' />
			</Form.Item>
			<Form.Item name="confirmPassword" htmlFor="password" label="Confirm password" rules={[
					{
						required: true,
						message: 'Please confirm your password',
					}
				]}>
				<Input type='password' />
			</Form.Item>
			<Form.Item name="inviteCode" htmlFor='inviteCode' label="Invite code" rules={[
					{
						required: true,
						message: 'Please input your invite code',
					}
				]}>
				<Input />
			</Form.Item>
			{isLoading
				? <LoadingDots />
				: (
				<Button
					className={`${isLoading ? 'loading' : 'not-loading'} something`}
					id='sign-up-submit-button'
					htmlType='submit'
				>
					Sign Up
				</Button>
				)}
		</Form>
	)
}
