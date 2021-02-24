import Head from 'next/head'
import React from 'react'
import { ExperienceBar } from '../components/ExperienceBar'

export default function Home() {
  return (
    <div className='container'>
      <ExperienceBar experience={'423'}/>
    </div>
  )
}
