import { Header } from '@/components/BaseComponents'
import { AuthStatus } from '@/components/Authentication'
import Logo from '@/components/Homepage/Logo'
import './Header.scss'

export default function MainHeader() {
  return (
    <Header id="main-header">
      <Logo />
      {/* <AuthStatus /> */}
    </Header>
  )
}