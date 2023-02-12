import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { auth } from '../environments/firebase.utils'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        router.push("/dashboard/home")
      }
    })
  })

  return (
    <div>
      <Head>
        <title>Quester</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/login">
        Go to Login
      </Link>
    </div>
  )
}
