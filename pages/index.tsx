import type { NextPage } from 'next'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Planner from './planner';
import Login from './login';



const Home: NextPage = () => {
//   const user = {
//     "_id": "621bb7377e3b531ca6d5a836",
//     "username": "youssef",
//     "email": "youssef@gmail.comm",
//     "profilePicture": "",
//     "__v": 0,
//     "city": "asnieres sur seine"
// }
  const user = null

  return (<>
    {typeof window !== 'undefined'? 
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={user ? <Planner/> : <Login/> }/>
        <Route  path="/login" element={user ? <Navigate to="/" />: <Login/>}/>

      </Routes>
    </BrowserRouter> : 
    <div></div>}
    </>
  )
}

export default Home