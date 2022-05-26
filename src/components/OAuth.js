import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const location = useLocation()
    const navigate = useNavigate()
  
    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // create user, if doesn't exist
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            toast.success('Authorized with Google successfully')
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    }

    return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
        <button onClick={onGoogleClick} className="socialIconDiv">
            <img className='socialIconImg' src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth