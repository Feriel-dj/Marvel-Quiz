import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from '../FireBase/firebase';
import { setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'


const SignUp = (props) => {
  const navigate = useNavigate();

  const data = {
    pseudo: '',
    email: '',
    password: '',
    Confirmpassword: ''
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');

  const handleChange= e => {
    setLoginData({...loginData, [e.target.id]: e.target.value});
  }

    const handleSubmit = e => {
      e.preventDefault();
      const { email, password } = loginData;
      createUserWithEmailAndPassword(auth, email, password)
      .then(authUser => {
          return setDoc(user(authUser.user.uid), {
            pseudo,
            email
          })
      })
      .then(() =>{
        setLoginData({...data});
        navigate('/Welcome');
      })
      .catch(error => {
          setError(error);
          setLoginData({...data});
      })
  }

    
  const {pseudo, email, password, Confirmpassword} = loginData; 

  const btn = pseudo === '' || email === '' || password === '' || Confirmpassword !== password ?
  <button disabled>Inscription</button> : <button>Inscription</button>

  //gestion d'erreur
  const errorMsg = error !== '' && <span>{error.message}</span>;


  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftSignup'></div>
            <div className='formBoxRight'>
              <div className='formContent'>
                {errorMsg}
              <h2>Inscription</h2>
             
                <form onSubmit={handleSubmit}>
                  <div className='inputBox'>
                  <input onChange={handleChange} value={pseudo} type="text" id='pseudo' autoComplete='off' required />
                  <label htmlFor='pseudo'>Pseudo</label>
                  </div>
                  <div className='inputBox'>
                  <input onChange={handleChange} value={email} type="email" id='email' autoComplete='off' required />
                  <label htmlFor='email'>Email</label>
                  </div>
                  <div className='inputBox'>
                  <input onChange={handleChange} value={password} type="password" id='password' autoComplete='off' required />
                  <label htmlFor='password'>Mot de passe</label>
                  </div>
                  <div className='inputBox'>
                  <input onChange={handleChange} value={Confirmpassword} type="password" id='Confirmpassword' autoComplete='off' required />
                  <label htmlFor='Confirmpassword'>Confirmer le mot de passe</label>
                  </div>
                  {btn}
                </form>
                <div className='linkContainer'>
                  <Link className='simpleLink' to="/Login">Déja inscrit? Connectez-vous. </Link>
                </div>
              </div>
            </div>
       </div>
      
    </div>
  )
}

export default SignUp
