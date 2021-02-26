import Head from 'next/head'
import React from 'react'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from "next";

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvier } from '../contexts/ChallengesContext';
import { ProfileProvider } from '../contexts/ProfileContext';

interface HomePageProps  {
  avatarUrl: string;
  cicleTime: number;
  challengesCompleted: number;
  currentExperience: number;
  isProfileConfigOpen: boolean;
  level: number;
  totalExperience: number;
  username: string;
}
export default function Home(props:HomePageProps) {
  return (
    <ChallengesProvier
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      totalExperience={props.totalExperience}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | StandUp.it</title>
        </Head>

        <ExperienceBar/>

        <CountdownProvider cicleTime={props.cicleTime}>
          <section>
            <div>
              <ProfileProvider
                avatarUrl={props.avatarUrl}
                isProfileConfigOpen={props.isProfileConfigOpen}
                username={props.username}
              >
                <Profile />
              </ProfileProvider>
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvier>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    avatarUrl,
    cicleTime,
    challengesCompleted,
    currentExperience,
    isProfileConfigOpen,
    level,
    totalExperience,
    username,
  } = ctx.req.cookies;

  return {
    props: {
      avatarUrl: avatarUrl ?? null,
      cicleTime: Number(cicleTime),
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
      isProfileConfigOpen: isProfileConfigOpen === 'false' ? false : true,
      level: Number(level),
      totalExperience: Number(totalExperience),
      username: username ?? null,
    }
  }
}