import React from 'react'
import Navbar from '../component/Navbar'
import HeroSection from '../component/HeroSection'
import AllCatagory from '../component/AllCatagory'

const Home = () => {
  return (
    
    <>
    <header>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
    </header>
    <main>
      <AllCatagory></AllCatagory>
    </main>
    </>
  )
}

export default Home