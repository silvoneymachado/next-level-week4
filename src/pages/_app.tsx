import '../styles/global.css';
import { ChallengesProvier } from '../contexts/ChallengesContext'
import React from 'react';
function MyApp({ Component, pageProps }) {
  return(
      <Component {...pageProps} />
  )
}

export default MyApp
