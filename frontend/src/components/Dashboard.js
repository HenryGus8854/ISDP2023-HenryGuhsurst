import React, { useEffect, useState } from 'react';
import './Main.css';
import { useNavigate} from 'react-router-dom';

let res;

export default function Dashboard({user}) {
    const navigate = useNavigate();
    const [tempUser, setUser] = useState(null);

    useEffect( ()=> {
      console.log(tempUser);
    },[tempUser]);

    useEffect(() => {
      checkUser();
    });

    function checkUser(){
      console.log(user)
      let temp = localStorage.getItem("User");
      //console.log(temp);
      if(temp == null){
        navigate("/login");
      }else{
        setUser(user);
      }
    }
    
  return (
    <div>
      <span>
        Dashboard - Hello {tempUser != null? tempUser.firstName || res:String}
      </span>
      <span id='location'>
        Location - {tempUser != null? tempUser.site.address || res:String}
      </span>
    </div>
  )
}
