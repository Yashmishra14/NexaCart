import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, LogIn } from 'lucide-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/slice'

const UserReg = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = React.useState('login')
  const [loading, setLoading] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    console.log(formData)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      let response

      if (state === 'login') {
        response = await axios.post('http://localhost:3000/userapi/login', {
          email: formData.email,
          password: formData.password
        })
      } else {
        response = await axios.post('http://localhost:3000/userapi/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      }

      console.log('Response:', response.data)
      const token = response.data.token
      dispatch(setUser({ token }))
      navigate('/home')
    } catch (error) {
      console.log('Error:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center mt-18'>
      <form
        onSubmit={handleSubmit}
        className='sm:w-[350px] w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8'
      >
        <h1 className='text-white text-3xl mt-10 font-medium'>
          {state === 'login' ? 'Login' : 'Sign up'}
        </h1>

        <p className='text-gray-400 text-sm mt-2'>
          {state === 'login'
            ? 'Please sign in to continue'
            : 'Please create an account to continue'}
        </p>

        {state !== 'login' && (
          <div className='flex items-center mt-3 w-full bg-gray-800 border border-gray-700 h-11 rounded-full overflow-hidden pl-6 gap-2'>
            <User size={18} className='text-gray-400' />

            <input
              type='text'
              name='name'
              placeholder='Name'
              className='w-full bg-transparent text-white placeholder-gray-400 border-none outline-none'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className='flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2'>
          <Mail size={18} className='text-gray-400' />

          <input
            type='email'
            name='email'
            placeholder='Email id'
            className='w-full bg-transparent text-white placeholder-gray-400 border-none outline-none'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2'>
          <Lock size={18} className='text-gray-400' />

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full bg-transparent text-white placeholder-gray-400 border-none outline-none'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mt-4 text-left'>
          <button
            type='button'
            className='text-sm text-indigo-400 hover:underline'
          >
            Forget password?
          </button>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {loading
            ? state === 'login'
              ? 'Logging in...'
              : 'Signing up...'
            : state === 'login'
              ? 'Login'
              : 'Sign up'}
        </button>

        <p
          onClick={() =>
            setState(prev => (prev === 'login' ? 'register' : 'login'))
          }
          className='text-gray-400 text-sm mt-3 mb-11 cursor-pointer'
        >
          {state === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}
          <span className='text-indigo-400 hover:underline ml-1'>
            click here
          </span>
        </p>
      </form>
    </div>
  )
}

export default UserReg
