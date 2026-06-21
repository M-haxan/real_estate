import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './components/Header'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing';

function App() {

  return (
    
      <BrowserRouter>
      <Toaster position="top-right" />
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/listing/:listingid' element={<Listing/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create-listing' element={<CreateListing/>}/>
            <Route path='/update-listing/:listingid' element={<UpdateListing/>}/>
          </Route>
          
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
