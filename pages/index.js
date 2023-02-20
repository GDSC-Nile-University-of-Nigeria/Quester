import Head from 'next/head'
import { useEffect } from 'react'
import { auth } from '../environments/firebase.utils'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        router.push("/dashboard/home")
      }
    })
  })

  const buttonProps = {
    textTransform: 'capitalize',
    width: '100%',
  }

  return (
    <div>
      <Head>
        <title>Quester</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='flex items-center justify-center'>
        <img src="/images/logo.svg"/>

        <h2>Welcome to Quester</h2>

        <Button variant='contained' sx={buttonProps} href='/login'>
          Login
        </Button>

        <Button sx={buttonProps} href='/sign-up'>
          Sign Up
        </Button>

      </section>

    </div>
  )
}
