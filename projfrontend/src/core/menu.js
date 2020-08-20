import React,{Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {signout, isAuthenticated} from '../auth/helper'

const currentTab =(history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }else{
        return {color: "#ffffff"}
    }
}

const Menu = ({history}) => (
    <div>
        <ul className='nav nav-tabs bg-info'>
            <li className='nav-item'>
                <Link style={currentTab(history, '/')} className='nav-link text-dark font-weight-bold' to="/">
                    Home
                </Link>
            </li>
            <li className='nav-item'>
                <Link style={currentTab(history, '/cart')} className='nav-link text-dark font-weight-bold' to="/cart">
                    Cart
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role===0 && (
                <li className='nav-item'>
                <Link style={currentTab(history, '/user/deshboard')} className='nav-link text-dark font-weight-bold' to="/user/dashboard">
                    Deshboard
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role===1 && (
                <li className='nav-item'>
                <Link style={currentTab(history, '/admin/dashboard')} className='nav-link text-dark font-weight-bold' to="/admin/dashboard">
                    Admin Deshboard
                </Link>
            </li>
            )}
            {!isAuthenticated() && (
                 <Fragment>
                 <li className='nav-item'>
                     <Link style={currentTab(history, '/signup')} className='nav-link text-dark font-weight-bold' to="/signup">
                         Signup
                     </Link>
                 </li>
                 <li className='nav-item'>
                     <Link style={currentTab(history, '/signin')} className='nav-link text-dark font-weight-bold' to="/signin">
                         Sign In
                     </Link>
                 </li>
                 </Fragment>
            )}
            
            {isAuthenticated() && (
                <li className='nav-item'>
                    <span className="nav-link text-warning" onClick={() => {
                        signout(() =>{
                            history.push("/")
                        })
                    }}>
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
)

export default withRouter(Menu)