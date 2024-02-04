import React from 'react';
import SearchBox from '../components/SearchBox';
import Navbar from '../pages/Navbar'

const Search = () => {
    return (
        <div className='h-screen bg-gradient-to-r  from-red-200 to-blue-400  '>
            <Navbar></Navbar> 
            <div >
            <SearchBox></SearchBox>
                </div>     
            
              
           
        </div>
    );
};

export default Search;