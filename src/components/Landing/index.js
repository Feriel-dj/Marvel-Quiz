import React, {Fragment, useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom';



const Landing = () => {
   const [btn, setbtn] = useState(false);
   console.log(btn);
    const refWolverine = useRef();
    useEffect(() => {
        refWolverine.current.classList.add('startingImg');
        setTimeout(() =>{
            refWolverine.current.classList.remove('startingImg');
            setbtn(true)
        },1000)
    },[])

    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg');
    }
    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg');
    }

    const clearImg = () => {
    if (refWolverine.current.classList.contains('leftImg')) {
        refWolverine.current.classList.remove('leftImg');
    } else if(refWolverine.current.classList.contains('rightImg')) {
        refWolverine.current.classList.remove('rightImg');
    }
}
    
    const displayBtn = btn && (
    <Fragment>
         <div onMouseOver={setLeftImg} onMouseOut={clearImg}  className='leftBox'>
              <Link className='btn-welcome' to="SignUp">Inscription</Link>
          </div>
          <div onMouseOver={setRightImg} onMouseOut={clearImg} className='rightBox'>
              <Link className='btn-welcome' to="Login">Connexion</Link>
          </div>
    </Fragment>
    )
  return (
    <div>
      <main ref={refWolverine} className='welcomePage'>
          {displayBtn}
      </main>
    </div>
  )
}

export default Landing
