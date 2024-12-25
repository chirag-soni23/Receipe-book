import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { UserData } from './context/User'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Saved from './pages/Saved'

const App = () => {
  const {isAuth, loading} = UserData();
  return (
    <>
        {isAuth && <Navbar/>}
    {loading ? <Loading/> :
      <Routes >
      <Route path='/' element={isAuth ? <Home/> : <Login/>}/>
      <Route path='/saved' element={isAuth ? <Saved/> : <Login/>}/>
      <Route path='/admin' element={isAuth ? <Admin/> : <Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={isAuth ? <Home/> : <Login/>}/>
      </Routes>}
    </>
  )
}

export default App