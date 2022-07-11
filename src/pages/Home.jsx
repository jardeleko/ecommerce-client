import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from "../components/Navbar"
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


const Home = () => {
    return (
        <div>
            <Navbar/>
            <Announcement/>
            <Slider/>
            <Categories/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home;
