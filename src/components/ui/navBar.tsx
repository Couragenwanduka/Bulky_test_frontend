import { Link, useLocation } from 'react-router-dom'
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../../redux/searchSlice'
import { useState, useEffect, useRef } from 'react'
import { logout } from '../../redux/authslice'

const NavBar = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const hideNavPages = ['/login', '/signup', '/cart', '/orders', '/settings', '/admin', '/wishlist']
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAdminDropDown, setShowAdminDropDown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const adminDropdownRef = useRef<HTMLDivElement>(null)


  // Close dropdown if user clicks outside
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
      adminDropdownRef.current && !adminDropdownRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(false)
      setShowAdminDropDown(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])

  return (
    <header className="flex w-full items-center bg-[var(--color-secondary)] p-4 relative">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to={'/'}>
          <h1 className="text-[25px] font-bold text-[var(--color-background)]">
            Bulky
          </h1>
        </Link>
      </div>

      {/* Middle: Search Bar (hidden on /login and /signup) */}
      {!hideNavPages.includes(location.pathname) && (
        <div className="flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="w-[80%] max-w-md rounded-[10px] border border-[var(--color-textSecondary)] bg-[var(--color-background)] py-2 pl-3 text-[var(--color-textPrimary)] focus:outline-none"
          />
        </div>
      )}

      {/* Right: User actions */}
      {isLoggedIn ? (
        <div className="flex flex-1 justify-end gap-4 items-center relative" ref={dropdownRef}>
          {/* <Link to={'/notification'}>
            <img src="/icons/notification.svg" alt="Notification" />
          </Link> */}
          <Link to={'/cart'}>
            <img src="/icons/cart.svg" alt="Cart" />
          </Link>
          <Link to={'/wishlist'}>
           <img src="/icons/favorite.svg" alt="Wish List" />
          </Link>

          {/* Dropdown Toggle */}
          <button onClick={() => setShowDropdown((prev) => !prev)}>
            <img src="/icons/person.svg" alt="Account" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-50">
              <ul className="flex flex-col text-sm text-gray-700">
                <li>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                      // TODO: dispatch logout here
                      setShowDropdown(false)
                  
                    }}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                      // TODO: dispatch logout here
                      setShowDropdown(false)
                   
                    }}>
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // TODO: dispatch logout here
                      setShowDropdown(false)
                      dispatch(logout())
                    }}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          { showAdminDropDown && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 z-50">
              <ul className="flex flex-col text-sm text-gray-700">
                <li>
                  <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-100"  onClick={() => {
                      // TODO: dispatch logout here
                      setShowAdminDropDown(false)
                     
                    }}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/ProductList" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                      // TODO: dispatch logout here
                      setShowAdminDropDown(false)
                     
                    }}>
                   ProductList
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                      // TODO: dispatch logout here
                      setShowAdminDropDown(false)
                     
                    }}>
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          )

          }

        {  user?.role === 'ADMIN' && (
            <button onClick={() => setShowAdminDropDown(true)}>
            <img src="/icons/admin.svg" alt="Admin" />
          </button>
        )

        }
        </div>
      ) : (
        <div className="flex flex-1 justify-end gap-4">
          <Link to={'/login'}>
            <button className="rounded-[8px] border-[0.5px] border-primary px-4 py-2 text-primary font-body">
              Login
            </button>
          </Link>
          <Link to={'/signup'}>
            <button className="rounded-[10px] border border-[var(--color-textSecondary)] bg-primary px-4 py-2 text-white font-body">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default NavBar
