import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {ReactComponent as VisibilityIcon} from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user) {
        navigate('/')
        toast.success('Signed In')
     }
    } catch (error) {
      toast.error('Wrong Credentials!')
    }

    
  }
  
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input 
          type="email" 
          className="emailInput" 
          id='email' 
          value={email} 
          onChange={onChange} 
          placeholder='Email' />

          <div className="passwordInputDiv">
            <input 
            type={showPassword ? 'text' : 'password'} 
            className='passwordInput' 
            id='password' 
            placeholder='Password' 
            value={password} 
            onChange={onChange} />

            <div className="showPassword">
              <VisibilityIcon
              fill={showPassword ? '#000000' : '#808080'}
              onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>
          </div>

          <Link to='/forgot-password' 
          className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn