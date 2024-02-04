import React from 'react';
import Signup from '../pages/Signup';
import teacher from '../animations/teacher.json'
import Lottie from 'lottie-react';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

const LoginForm = () => {
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const signIn = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`https://vmdb-iota.vercel.app/api/login`, {email, password}).then((res) => {
        setLoading(false)
        setError(null)
        signIn({
          token: res.data.token,
          expiresIn: 259200,
          tokenType: "Bearer",
          authState: {email: email, name: res.data.name, _id: res.data._id}
        })
        navigate('/Login')
      })
    } catch(err) {
      setLoading(false)
      if (err && err instanceof AxiosError)
      setError(err.response?.data);
      else if (err && err instanceof Error) setError(err);
      console.log("Error: ", err)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

    return (
        <div >
            <div className="card flex-shrink-0 w-96 max-w-xl shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input required value={email} onInput={(e) => setEmail(e.target.value)} type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input required value={password} onInput={(e) => setPassword(e.target.value)} type="text" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className = "btn text-white bg-gradient-to-r  from-red-500 to-blue-700 shadow-2xl">{loading == true ? <CircularProgress size={10} isIndeterminate color='green.300' /> : 'Login'} </button>
          {
            error &&
            <Alert style={{marginTop: '1rem'}} status='error'>
    <AlertIcon />
    {error}
  </Alert>
          }
        </div>
        </form>
        
        <div><p>Don't have an account?
          {/* You can open the modal using ID.showModal() method */}
<div className="text-blue-400" onClick={()=>window.signup_modal.showModal()}> <button class="text-blue-500 background-transparent" type="button">
  SignUp Now!</button> </div>
<dialog id="signup_modal" className="modal">
  <form method="dialog" className="modal-box">
    <button className="btn btn-sm btn-circle btn-ghost  absolute right-2 top-2">✕</button>
    <Signup></Signup>
  </form>
</dialog>
           </p></div>
           
      </div>
    </div>
        </div>
    );
};

export default LoginForm;