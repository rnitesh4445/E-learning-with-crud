import {React,useState,useEffect} from 'react'
import { UserContext } from './UserContext'
import axios from 'axios';
function UserContextProvider({children}) {
    const [video,setVideo]=useState([]);
    const [user,setUser]=useState([])
    const [fil,setFil]=useState([]);
    const[admin,setAdmin]=useState([])
    useEffect(()=>{
           axios.get('http://localhost:3000/videos')
           .then((response)=>
           {
            setVideo(response.data)
            setFil(response.data)
           },
           axios.get('http://localhost:3000/users')
           .then((response)=> setUser(response.data))
          ),
      axios.get('http://localhost:3000/admin')
      .then((response)=> setAdmin(response.data) )
           
           
    },[])
  return (
    <UserContext.Provider value={{video,setVideo,fil,setFil,user,setUser,admin}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider