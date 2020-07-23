import React from 'react'

import { Link } from 'react-router-dom'
import '../../styles/Landing.scss'

export const Landing = () => {
   return (
      <section className='landing'>
         <div className='landing-overlay'>
            <div className='landing-inner'>
               <h1 className='landing-title'>Developer Connector</h1>
               <p className='landing-description'>
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
               </p>
               <div className='landing-buttons'>
                  <Link className='landing-buttons_signup' to='/signup'>
                     Sign Up
                  </Link>
                  <Link className='landing-buttons_login' to='/login'>
                     Login
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}
