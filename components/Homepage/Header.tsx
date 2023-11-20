import { Suspense } from 'react'
import { Header as BaseHeader } from '../BaseComponents'
import { AuthStatus } from '@/components/Authentication'
import Logo from '@/components/Homepage/Logo'
import './Header.scss'

export default function MainHeader() {
  return (
    <BaseHeader>
      <Logo />
      <Suspense fallback={<div>Loading...</div>}>
        <AuthStatus />
      </Suspense>
    </BaseHeader>
  )
}