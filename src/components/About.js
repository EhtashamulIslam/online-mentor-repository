import React from 'react';
import teacher from '../animations/teacher.json'
import Lottie from 'lottie-react';
import {FaMale} from 'react-icons/fa';
import {FaBook} from 'react-icons/fa';
import {FaRunning} from 'react-icons/fa';




const About = () => {
    return (
        
           <div className='grid lg:grid-cols-2 grid-cols-1 py-12 lg:px-20 bg-gray-200 rounded-xl h-full'>
            <div className=' py-12 '>
                <h2 className='text-3xl  font-bold'>Rate Your Mentor and Let know others!</h2>
                <h3 className='text-xl my-12 mx-40 flex items-center'>
                <FaMale size='2rem' color='gray' className='mr-3' />
                Know your Mentor's profile
                </h3>
                <h3 className='text-xl my-12 mx-40 flex items-center'>
                <FaBook size='2rem' color='gray' className='mr-3' />
                Know their research interest
                </h3>
                <h3 className='text-xl my-12 mx-40 flex items-center'>
                <FaRunning size='3rem' color='gray' className='mr-3' />
                Keep updated with their recent courses and activities
                </h3>
            </div>
            <div className='lg:w-[600px] w-[450px] lg:h-[500px] mr-64 lg:ml-48'>
            <Lottie  animationData={teacher}/>
            </div>
            
            </div> 
        
    );
};

export default About;