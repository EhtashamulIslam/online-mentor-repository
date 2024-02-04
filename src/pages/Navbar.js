import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import {FaBeer} from 'react-icons/fa';
import Profile from './Profile';
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';
import {useSignOut} from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
    const signOut = useSignOut()
    const navigate = useNavigate()
    const urlSearchParams = new URLSearchParams(window.location.search).get('keyword');
    const [keyword, setKeyword] = useState(urlSearchParams)

    const search = (keyword) => {
        if (keyword.length > 0) {
            setKeyword(keyword)
            navigate(`/Profile?keyword=${keyword}`)
        } else {
            navigate('/Profile')
        }
    }


    return (
        
            <div className=" bg-opacity-40 top-0 z-50 shadow-2xl w-full h-24   navbar  text-white bg-gradient-to-r sticky top-0 grid grid-cols-3  from-purple-800/[0.8] to-red-600/[0.8] shadow-2xl ">
  <div>
  <Link to='/' className="btn btn-ghost normal-case text-xl">VMDB</Link>
  <Link to='/Home' className="btn btn-ghost normal-case">Home</Link>
  <Link to='/Login' className="btn btn-ghost normal-case">{isAuthenticated() == true ? auth().name : 'Login' }</Link>

  <Link to='/Profile' className="btn btn-ghost normal-case">Search</Link>
  
  </div>
  <div>
  <input value={urlSearchParams} onInput={(e) => search(e.target.value)} type="search" placeholder="Search your mentor " className="input rounded-2xl input-bordered text-black w-full items-center"/>
  <div className='grid justify-items-end'>
  <Link to='./Profile'>
  {/* <button className='btn absolute bg-pink-600 text-white my-[-24px]'>Search</button> */}
  </Link>
  </div>
  </div>
  <div className='flex-1 flex items-center justify-end'>
  {
    isAuthenticated() == true &&
    <button onClick={() => {signOut(); navigate('/Login')}} className="btn btn-ghost normal-case">Log Out</button>
  }
  </div>
  
</div>
        
    );
};

export default Navbar;