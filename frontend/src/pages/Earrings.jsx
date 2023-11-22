import React from 'react'
import HeroImage from '../components/HeroImage'
import Card from '../components/CardList'
import Container from "../components/Container";


const Earrings = () => {
  return (
    <Container>
    <HeroImage imageUrl="https://plus.unsplash.com/premium_photo-1667662923507-5edd1b607595?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    <Card/>
    <div></div>
    </Container>
  )
}

export default Earrings