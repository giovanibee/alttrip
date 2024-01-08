import { Suspense } from 'react'
import { Header as BaseHeader } from '../BaseComponents'
import { AuthStatus } from '@/components/Authentication'
import Logo from '@/components/Homepage/Logo'
import './Header.scss'

export function MainHeader() {
  return (
    <BaseHeader id="main-header">
      <Logo />
      <Suspense fallback={<div>Loading...</div>}>
        <AuthStatus />
      </Suspense>
    </BaseHeader>
  )
}