import React from 'react'
import Navbar from '../component/Navbar'
import HeroSection from '../component/HeroSection'
import AllCatagory from '../component/AllCatagory'
import Statistics from '../component/Statistics'
import HowItWorks from '../component/HowItWorks'
import Footer from '../component/Footer'

const Home = () => {
  return (
    
    <>
    <header>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
    </header>
    <main>
      <AllCatagory></AllCatagory>
      <Statistics></Statistics>
      <HowItWorks></HowItWorks>
    </main>
    <footer>
      <Footer></Footer>
    </footer>

    </>
  )
}

export default Home