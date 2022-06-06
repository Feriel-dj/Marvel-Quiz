import React, {useState, useEffect} from 'react'
import {signOut} from 'firebase/auth';
import { auth } from '../FireBase/firebase';
import { useNavigate } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

const Logout = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    console.log(checked);
    useEffect(() => {
        if(checked){
                signOut(auth).then(() => {
                // Sign-out successful.
                console.log("Vous etes déconnecter");
                setTimeout(() =>{
                    navigate('/')
                },1000)
                }).catch((error) => {
                // An error happened.
                console.log("Oups, nous avons une erreur");
                });
        }
    }, [checked]);

    const handelChange= e =>{
        setChecked(e.target.checked);
    }
  return (
    <div className='logoutContainer'>
        <label className='switch'>
            <input onChange={handelChange} type="checkbox" checked={checked} />
            <span className='slider round' data-tip="Déconnexion"></span>
        </label>
        <ReactTooltip 
        place="left"
        effect='solid'
        />
    </div>
  )
}

export default Logout