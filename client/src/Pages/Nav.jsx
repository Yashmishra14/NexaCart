import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, List } from 'lucide-react'
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
    <nav className="fixed top-0 left-0 w-full h-[52px] bg-gradient-to-r from-[#f0f4f9] via-white to-[#e8eff5] shadow-sm border-b border-gray-200 px-6 md:px-12 flex items-center justify-between z-40">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/home')}
      >
        <ShoppingCart className="text-blue-500" strokeWidth={2.5} size={24} />
        <span className="text-xl font-bold text-slate-800 tracking-tight">
          NexaCart
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <button
          onClick={() => navigate('/home')}
          className="text-gray-500 hover:text-slate-900 font-medium text-sm transition-colors"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/product')}
          className="text-gray-500 hover:text-slate-900 font-medium text-sm transition-colors"
        >
          Shop
        </button>
        <button className="text-gray-500 hover:text-slate-900 font-medium text-sm transition-colors">
          About
        </button>
        <button className="text-gray-500 hover:text-slate-900 font-medium text-sm transition-colors">
          Contact
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-slate-900 transition-colors">
          <Search size={20} strokeWidth={2} />
        </button>

        <button
          onClick={user ? handleLogout : null}
          title={user ? `Logout ${user.name || user.username || ''}` : "User Profile"}
          className="text-gray-600 hover:text-slate-900 transition-colors"
        >
          <span>Logout</span>
          <User size={20} strokeWidth={2} />
        </button>

        <button className="text-gray-600 hover:text-slate-900 transition-colors relative">
          <List size={20} strokeWidth={2} />
        </button>
      </div>

    </nav>
  )
}

export default Nav