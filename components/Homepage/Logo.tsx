'use client'

import Link from 'next/link'
import './Header.scss'

export default function Logo() {
  return (
    <>
      <Link id='logo' href='/'>
        <div id='logo-1'>alt</div>
        <div id='logo-2'>trip</div>
      </Link>
      <div id='tagline'>
        There&apos;s magic everywhere!
      </div>
    </>
  )
}