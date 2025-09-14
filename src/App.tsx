import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import NavBar from './components/ui/navBar'
import Login from './pages/login'
import Signup from './pages/signUp'
import Cart from './pages/cart'
import Order from './pages/order'
import Settings from './pages/settings'
import ProtectedRoute from './pages/protectedRoute'
import Product from './pages/product'
import ProductList from './pages/productList'
import EditProduct from './pages/editProduct'
import MakeAdmin from './pages/makeAdmin'
import WishList from './pages/wishList'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/settings" element={<Settings />} />
        <Route path='/wishlist' element={<WishList />} />

        <Route 
         path='/admin/products'
         element={
          <ProtectedRoute role='ADMIN'>
            <Product/>
          </ProtectedRoute>
         }
        />
        <Route 
         path='/admin/productList'
         element={
          <ProtectedRoute role='ADMIN'>
            <ProductList/>
          </ProtectedRoute>
         }
        />
        <Route 
         path='/admin/products/edit/:id'
         element={
          <ProtectedRoute role='ADMIN'>
            <EditProduct/>
          </ProtectedRoute>
         }
        />
        <Route 
         path='/admin/users'
         element={
          <ProtectedRoute role='ADMIN'>
          <MakeAdmin/>
          </ProtectedRoute>
         }
        />
      </Routes>
    </div>
  )
}

export default App
