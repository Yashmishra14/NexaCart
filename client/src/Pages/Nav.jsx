import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User } from 'lucide-react'
import { logout } from '../Redux/slice'

const Nav = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        NexaCart
      </div>
          {/* Home, About, Contact Buttons */}
        <div className="hidden md:flex items-center gap-6 mr-2">
          <button className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
            Home
          </button>
          <button className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
            About
          </button>
          <button className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
            Contact
          </button>
        </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center w-1/4 bg-gray-100 rounded-full px-2 py-2">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search AI Products..."
          className="bg-transparent outline-none w-full px-2 text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

    

        {/* Cart */}
        <div className="relative cursor-pointer">
          <ShoppingCart className="text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
            2
          </span>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {(
              user?.name ||
              user?.username ||
              (user?.email && user.email.split('@')[0]) ||
              'Guest'
            )}
          </span>
          {user && (
            <button
              onClick={handleLogout}
              className="ml-3 text-sm text-indigo-600 hover:underline"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Nav