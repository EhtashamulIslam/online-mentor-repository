import React, {useEffect, useState} from 'react';
import avatar from '../images/User-avatar.png'
import '../css/Profile.css'
import Navbar from './Navbar';
import Mentor from './Mentor';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const [mentors, setMentors] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword');


    const fetchData = async () => {
        setLoading(true)
        try {
            let data = {
                page: 1
            }
            if (keyword !== null) {
                data.keyword = keyword
            }
            const response = await axios.post(`https://vmdb-iota.vercel.app/api/get_mentors`, data);
            setLoading(false)
            setMentors(response.data);
          } catch (error) {
            setLoading(false)
            console.error('Error fetching more mentors:', error);
          }
    }

    useEffect(() => {
       fetchData()
    }, [keyword])


    const fetchMoreData = async () => {
        setLoading(true)
        try {
            let data = {
                page: page + 1
            }
            if (keyword !== null) {
                data.keyword = keyword
            }
          const response = await axios.post(`https://vmdb-iota.vercel.app/api/get_mentors`, data);
          setLoading(false)
          if (response.data.length === 0) {
          
            // No more mentors to fetch
            return;
          }
          setMentors([...mentors, ...response.data]);
          setPage(page + 1);
        } catch (error) {
         setLoading(false)
          console.error('Error fetching more mentors:', error);
        }
      };

    

    return (
        <div className='h-screen bg-white'>
            <InfiniteScroll
             dataLength={mentors.length}
             next={fetchMoreData}
             hasMore={true} // Set this based on your logic
            //  loader={<h4>Loading...</h4>}
            >
               
                {
                    mentors.map((mentor, idx) => {
                        return (
                            <div key={idx} className='grid lg:grid-cols-3 hover:bg-slate-200 bg-slate-100 border-rounded profile-section mx-auto mb-4'>
            <img src={avatar} className='rounded-3xl w-64 lg:w-32 m-12 ' alt="" />
         
            <div>
                <h1 className=' text-2xl font-bold grid align-items-center mt-16'>{mentor.name}</h1>
                <p>Department: CSE</p>
                <p className='font-bold' >{mentor.occupation}, {mentor.organization}</p> 
            </div>
            <Link to={`/Mentor/${mentor._id}`} className='btn btn-primary mt-20 mx-10'>View Profile</Link>

           </div>
                        )
                    })
                }
            </InfiniteScroll>
            {
                    loading == true &&
<CircularProgress isIndeterminate color='green.300' />

                }
        </div>
    );
};

export default Profile;