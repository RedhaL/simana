import type { NextPage } from 'next'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Planner from './planner';
import Login from './login';
import Register from './register';
import { useEffect } from 'react';

const Home: NextPage = () => {

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem("user");
  var localUser = JSON.parse(saved ? saved : "{}")}

  return (<>
    {typeof window !== 'undefined'? 
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={Object.keys(localUser).length !== 0 ? <Planner/> : <Login/> }/>
        <Route  path="/login" element={Object.keys(localUser).length !== 0  ? <Navigate to="/" />: <Login/>}/>
        <Route  path="/register" element={Object.keys(localUser).length !== 0  ? <Navigate to="/" />: <Register/>}/>
      </Routes>
    </BrowserRouter> : 
    <div></div>}
    </>
  )
}

export default Home