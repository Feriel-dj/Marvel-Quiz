import React, {Fragment} from 'react'
import './Loader.css'

const Loader = ({loadingMsg, Styling}) => {
  return (
    <Fragment>
        <div className='loader'></div>
        <p style={Styling}>
            {loadingMsg}
        </p>
    </Fragment>
  )
}

export default Loader

