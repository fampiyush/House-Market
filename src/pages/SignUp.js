import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {ReactComponent as VisibilityIcon} from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password} = formData

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

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser,  {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
      toast.success('Signed Up')
    } catch (error) {
      toast.error('Something went wrong in registration!')
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
          type="text" 
          className="nameInput" 
          id='name' 
          value={name} 
          onChange={onChange} 
          placeholder='Name' />
          
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

          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp