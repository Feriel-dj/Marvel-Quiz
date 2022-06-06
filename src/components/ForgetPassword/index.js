import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../FireBase/firebase';


const ForgetPassword = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = e =>{
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            setError(null);
            setSuccess(`Consulter votre email ${email} pour changer le mot de passe`);
            setEmail("");
            setTimeout(() => {
                navigate('/Login')
            }, 5000);
          })
          .catch((error) => {
            setError(null);
            setEmail("");
          });
    }

    const disabled = email === "" ;
  return (
    <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {success && <span style={{
                            border: " 1px solid green",
                            background: "green",
                            color: "#ffffff"
                        }}>
                            {success}
                            </span>}
                        {error && <span>{error.message}</span>}
                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled = {disabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/Login">Déja inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForgetPassword
