import React from 'react';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CircularProgress } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`https://vmdb-iota.vercel.app/api/register`, {firstName, lastName, email, password}).then((res) => {
        setLoading(false)
        setError(null)
        setSuccess(res.data.message)
        setTimeout(() => {
          setSuccess(null)
        }, 3000)
      })
    } catch(err) {
      setLoading(false)
      setSuccess(false)
      if (err && err instanceof AxiosError)
      setError(err.response?.data.error);
      else if (err && err instanceof Error) setError(err);
      console.log("Error: ", err)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    
  }

    return (
        <form onSubmit={(e) => onSubmit(e)}>          
           <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input required value={firstName} onInput={(e) => setFirstName(e.target.value)} type="text" placeholder="Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input required value={lastName} onInput={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input required value={email} onInput={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input required value={password} onInput={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered" />
        </div>
        <button type='submit' className='btn text-white bg-gradient-to-r  from-red-500 to-blue-700 shadow-2xl mt-5'>{loading == true ? <CircularProgress size={10} isIndeterminate color='green.300' /> : 'Sign Up'}</button>
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
    );
};

export default Signup;