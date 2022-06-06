import React, {Fragment, useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, user } from '../FireBase/firebase'
import Logout from '../Lougout'
import Quiz from '../Quiz'
import { getDoc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import Loader from '../Loader'


const Welcome = () => {
  const navigate = useNavigate();

const [userSesion, setUserSesion] = useState(null);
const [Userdata, setUserdata] = useState({});

useEffect(() => {
  const listener = onAuthStateChanged(auth, (user) =>{
    user ? setUserSesion(user) : navigate('/')
  })
  if (userSesion !== null) {
    const calref = user(userSesion.uid);

  getDoc(calref)
  .then(Snapshot => {
    if (Snapshot.exists()) {
      const docdata = Snapshot.data();
      setUserdata(docdata);
    }
  })
  .catch(error => {
    console.log(error);
  } )
  }
  
  return listener();
}, [userSesion]);

return userSesion === null ? (
  <Loader 
  loadingMsg={"Authentification..."}
  Styling={{textAlign: 'center', color: '#FFFFFF'}} />

) : (
  <div className='quiz-bg'>
  <div className='container'>
      <Logout />
      <Quiz Userdata={Userdata} />
  </div>

</div>
)


  
}

export default Welcome
