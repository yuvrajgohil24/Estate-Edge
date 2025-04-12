import React, { useContext } from 'react'
import SearchBar from "../../components/search/SearchBar";
import './home.scss'
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    console.log("Current User-->", currentUser)
    return (
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
                    <p>
                        Discover, list, and explore the best real estate opportunities with ease. Whether you're buying, selling, or just browsing, Estate-Edge connects you to your perfect space — anytime, anywhere.
                    </p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>2000+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default Home
