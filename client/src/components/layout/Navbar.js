import React from 'react'
import '../../styles/Navbar.scss'
import developIcon from '../../assets/images/develop.png'

export const Navbar = () => {
   return (
      <nav className='navbar'>
         <h1 className='navbar-title'>
            <a href='index.html'>
               <img src={developIcon} alt='develop' />
               DevConnector
            </a>
         </h1>
         <ul className='navbar-list'>
            <li>
               <a href='index.html'>Developers</a>
            </li>
            <li>
               <a href='index.html'>Register</a>
            </li>
            <li>
               <a href='index.html'>Login</a>
            </li>
         </ul>
      </nav>
   )
}
