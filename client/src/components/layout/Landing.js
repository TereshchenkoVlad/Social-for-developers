import React from 'react'
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
                  <a className='landing-buttons_signup' href='index.html'>
                     Sign Up
                  </a>
                  <a className='landing-buttons_login' href='index.html'>
                     Login
                  </a>
               </div>
            </div>
         </div>
      </section>
   )
}
