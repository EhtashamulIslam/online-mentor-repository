import React from 'react';
import Carousel from '../components/Carousel';
import Navbar from '../pages/Navbar'
import Features from '../components/Features';
import teacher from '../animations/teacher.json'
import Lottie from 'lottie-react';
import About from '../components/About';


const Home = () => {
    return (
        <div>
              
            <Carousel></Carousel>
             <Features></Features>
             <About></About>
                    
        </div>
    );
};

export default Home;