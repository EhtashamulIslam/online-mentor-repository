import React, { useEffect, useState } from 'react';
import dp from '../images/User-avatar.png'
import YouTube from 'react-youtube'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { CircularProgress } from '@chakra-ui/progress';
import ReactStars from 'react-stars'
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';
import {
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'
  import { Swiper, SwiperSlide } from 'swiper/react';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import { Navigation, Autoplay } from 'swiper/modules';

const Mentor = () => {
    // const videoId = 'xNRJwmlRBNU';

    const [videos, setVideos] = useState([]);
    const [mentor, setMentor] = useState()
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState()
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)

    const fetchMentorProfile = () => {
        setLoading(true)
         axios.post(`https://vmdb-iota.vercel.app/api/get_mentor_profile`, {_id: params.id}).then((res) => {
             if (res.status == 200) {
                 setLoading(false)
                 setMentor(res.data)
             }
         }).catch((err) => {
              setLoading(false)
             console.log(err)
         })
     }

     const fetchVideos = () => {
        axios.get(`https://vmdb-iota.vercel.app/api/get_courses_by_mentor?_id=${params.id}`,).then((res) => {
             if (res.status == 200) {
                 setVideos(res.data.map((course) => {return course.url}))
             }
         }).catch((err) => {
             console.log(err)
         })
     }

     useEffect(() => {
        fetchVideos()
     },[])

    useEffect(() => 
    {
        fetchMentorProfile()
    }, [params.id])

    const submitReview = (e) => {
        e.preventDefault()
        setFormSubmitLoading(true)
        let data = {
            rating, 
            comment,
            _id: params.id
        }
        if (isAuthenticated()) {
            data.reviewer = auth()._id
        }
        axios.post(`https://vmdb-iota.vercel.app/api/mentor_review`, data).then((res) => {
            if (res.status == 200) {
                setFormSubmitLoading(false)
                fetchMentorProfile()
                setError(null)
                setSuccess('Review submitted!')
                setComment('')
                setRating(1)
                setTimeout(() => {
                  setSuccess(null)
                }, 3000)
            }
        }).catch((err) => {
            console.log(err)
            setFormSubmitLoading(false)
            setError('Your review could not be submitted at the moment. Please try again later.');
            setTimeout(() => {
                setError(null)
              }, 5000)
        })
    }

    function calculateAverageRating(mentorData) {
        if (!mentorData || !mentorData.reviews || mentorData.reviews.length === 0) {
          return 0; // Return 0 if no reviews are available
        }
      
        const totalRatings = mentorData.reviews.reduce((sum, review) => {
          return sum + review.rating;
        }, 0);
      
        const averageRating = Math.round(totalRatings / mentorData.reviews.length);
        console.log(averageRating)
        return averageRating; // Return average rating rounded to 2 decimal places
      }

    return (
        <div>
            <div className='grid grid-cols-2 my-36 mx-24 '>
            <img className='max-w-lg' src={dp} alt="" />
            {
                loading == true ?
                <div className='flex items-center justify-center'>
 <CircularProgress  isIndeterminate color='green.300' />
                </div>
                :
                <>
                <div>
           
           <h1 className=' text-2xl font-bold grid align-items-center mt-32'>{mentor?.name}</h1>
                   <p>Department: {mentor?.department}</p>
                   <p className='font-bold' >{mentor?.occupation}, {mentor?.organization}</p> 
   
          <span className=' font-semibold'>Education: {mentor?.education}</span> <br />
           <span className=' font-semibold'>Research Area: {mentor?.research_area} </span> 
           <p>Email: {mentor?.contact?.email} <br />
           Contact: {mentor?.contact?.phone}</p>
           
           
           
          <div className='grid justify-items-center my-8'>
           <Rating ratingNumber={calculateAverageRating(mentor)}></Rating>
          </div>
          <a href={`mailto:${mentor?.contact?.email}`} className='btn btn-primary'>Contact for Research intereset</a>
           </div>
                </>
            }
        
            </div>
            {
                videos.length > 0 &&
                <div className='grid justify-items'>
            <h1 className='text-2xl font-bold'>
                Sample Recorded Classes
            </h1>
            <div className='flex my-12 justify-center'
            > {videos.map(videoId => (
                <YouTube key={videoId} videoId={videoId} className='mx-12' ></YouTube>

            ))}
                
            </div>
            </div>
            }
            
{
    mentor?.reviews && mentor?.reviews.length > 0 &&
    <div className='max-w-3xl ml-auto mr-auto my-12'>
<h1 className='text-2xl font-bold'>Reviews</h1>

<Swiper
      navigation
      modules={[Navigation]}
    >
      {mentor?.reviews?.map((slide) => (
        <SwiperSlide key={slide._id}>
          <div className="slide-content">
            {/* Render your slide content here */}
            <div className='grid justify-items-center my-4'>
            <Rating ratingNumber={slide.rating}></Rating>
            </div>
            <p>“{slide.comment}”</p>
            <p> - {slide.reviewer?.name || 'Annonymous'}</p>
            {/* Add more slide content */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
</div>
}


            <form onSubmit={(e) => {submitReview(e)}} className='max-w-max flex flex-col mx-36 my-12 ml-auto mr-auto'>
            <div className='flex items-center  ml-auto mr-auto'>
                <span className='mr-2.5'>Your rating:</span>
                <ReactStars
            value={rating}
  count={5}
  onChange={(e) => setRating(e)}
  size={24}
  color2={'#ffd700'} />
            </div>
            
            <textarea value={comment} onInput={(e) => setComment(e.target.value)} required className="textarea border-black w-96 h-44 ml-auto mr-auto" placeholder="Write comments here"></textarea>
            <button type='submit' className='mt-4 btn btn-primary'>{formSubmitLoading == true ? <CircularProgress size={10} isIndeterminate color='green.300' /> : 'Submit'}</button>
            {
          error &&
          <Alert style={{ marginTop: '1rem' }} status='error'>
            <AlertIcon />
            {error}
          </Alert>
        }
        {
          success &&
          <Alert style={{ marginTop: '1rem' }} status='success'>
            <AlertIcon />
           {success}
          </Alert>
        }
            </form>
            
            <div className='py-12'>
                <Link to={isAuthenticated() == true ? `/Mentor/${params.id}/Courses` : {pathname: '/Login', state: `/Mentor/${params.id}/Courses`} } className='btn btn-primary'> Enroll full courses here</Link>
            </div>
        </div>
    );
};

export default Mentor;