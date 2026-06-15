import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
