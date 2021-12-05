import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import {logout} from '../../features/slice'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
import 'bootstrap/dist/css/bootstrap.css';
import {getLoginUser, getLoginAdmin, getLoginCandidate, logoutAdmin, logoutUser} from '../../data-fetch/api.js';
import './Header.css';
const Header = () => {
  const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const [loginUserDetail, setLoginUserDetail] = useState({})

    useEffect(() => {
    
        if(user.userType === "admin") {
            const loginUserDetailfunction = async () => {
                var response = await  getLoginAdmin(user.token);
                setLoginUserDetail(response.user)
            }
            loginUserDetailfunction()
        }else if(user.userType === "user") {
            const loginUserDetailfunction = async () => {
                var response = await  getLoginUser(user.token);
                setLoginUserDetail(response.user)
            }
            loginUserDetailfunction()
        }else if(user.userType === "candidate") {
            const loginUserDetailfunction = async () => {
                var response = await  getLoginCandidate(user.token);
                setLoginUserDetail(response.user)
            }
            loginUserDetailfunction()
        }
    }, [])

    const handleLogout = async () => {
        dispatch(logout({
            user: null
        }))
        if(user.userType === "admin") {
            const loginUserDetailfunction = async () => {
                await  logoutAdmin(user.token);
            }
            loginUserDetailfunction()
        }else if(user.userType === "user") {
            const loginUserDetailfunction = async () => {
                var response = await  logoutUser(user.token);
                setLoginUserDetail(response.user)
            }
            loginUserDetailfunction()
        }else if(user.userType === "candidate") {
            const loginUserDetailfunction = async () => {
                var response = await  getLoginCandidate(user.token);
                setLoginUserDetail(response.user)
            }
            loginUserDetailfunction()
        }
    }
    return (
        <React.Fragment>  
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href='#/' role="button"><i className="fas fa-bars" /></a>
            </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
            {/* Navbar Search */}
            <li className="nav-item">
                <Link href="#" className="nav-link">{(loginUserDetail.type==='admin' || loginUserDetail.type==='candidate')?loginUserDetail.fullname: (loginUserDetail.type==='user')?loginUserDetail.name : ''}</Link>
            </li>
            <li className="nav-item">
                <a href="/sign-in" className="nav-link" onClick={handleLogout}>Sign off</a>
            </li>
            </ul>
        </nav>
        </React.Fragment>
    )
}
export default Header;