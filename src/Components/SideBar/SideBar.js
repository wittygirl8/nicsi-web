import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
import {getLoginUser, getLoginAdmin, getLoginCandidate} from '../../data-fetch/api.js';
import './SideBar.css';

const SideBar = ({isActive}) => {
  const user = useSelector(selectUser);
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
    return (
        <React.Fragment>
            {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
            <img src="images/A.png" alt="AEOLOGIC" className="brand-image img-circle elevation-3" style={{borderRadius:'.5%', height:'100%', widows:'120%'}} />
            <span className="brand-text font-weight-light"><span style={{ opacity:'0'}}>J</span><img src="images/eologic.png" alt="" className="brand-image img-circle elevation-3" style={{borderRadius:'.5%', height:'20%',marginLeft:'-2%'}} /></span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="/images/Profile-Pic-Demo.png" className="img-circle elevation-2" style={{ position:'fixed'}} alt="User"/>
            </div>
            <div className="info">
                
                <Link to="/dashboard" className="d-block" style={{ marginLeft:'2rem'}}>{(loginUserDetail.type==='admin' || loginUserDetail.type==='candidate')?loginUserDetail.fullname: (loginUserDetail.type==='user')?loginUserDetail.name : ''}</Link>
                <Link to="/dashboard" style={{ marginLeft:'2rem', fontSize:'.98rem'}}>{(loginUserDetail.type==='admin' || loginUserDetail.type==='candidate')? loginUserDetail.type  && loginUserDetail.type [0].toUpperCase() + loginUserDetail.type.slice(1): (loginUserDetail.type==='user')?'Project Co-Ordinator' : ''}</Link>
            </div>
            </div>
            
            {/* Sidebar Menu */}
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {loginUserDetail.type === 'admin' && 
                        <React.Fragment>
                            <li className="nav-item menu-open">
                            <a href="/pending-candidates" className={`nav-link ${(isActive==='approved' || isActive==='reject' || isActive==='pending')? 'active': ''}`}>
                                <i className="nav-icon far fa-plus-square" />
                                <p>Candidate
                                <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                            <li className="nav-item">
                                        <Link to="/approved-candidates" className={`nav-link ${isActive==='approved'? 'active': ''}`}>
                                            <i className="nav-icon far fa-circle text-info" />
                                            <p>Approved Candidates</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/reject-candidates" className={`nav-link ${isActive==='reject'? 'active': ''}`}>
                                            <i className="nav-icon far fa-circle text-danger" />
                                            <p>Reject Candidates</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/pending-candidates" className={`nav-link ${isActive==='pending'? 'active': ''}`}>
                                            <i className="nav-icon far fa-circle text-warning" />
                                            <p>Pending Candidates</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="/project-cordinator" className={`nav-link ${isActive==='coordinator'? 'active': ''}`}>
                                    <i className="nav-icon fas fa-edit" />
                                    <p>Project Coodinator</p>
                                </Link>
                            </li> 
                            <li className="nav-item">
                                <Link to="/project" className={`nav-link ${isActive==='project'? 'active': ''}`}>
                                    <i className="nav-icon fas fa-chart-pie" />
                                    <p>Project</p>
                                </Link>
                            </li>        
                            <li className="nav-item">
                                <Link to="/work-order" className={`nav-link ${isActive==='workorder'? 'active': ''}`}>
                                    <i className="nav-icon fas fa-table" />
                                    <p>Work Order</p>
                                </Link>
                            </li>        
                        </React.Fragment>
                    }
                    {loginUserDetail.type === 'user' && 
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/assigned-project" className={`nav-link ${isActive==='assigned_project'? 'active': ''}`}>
                                <i className="nav-icon fas fa-chart-pie" />
                                <p>Projects</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/monthly-preformance-report" className={`nav-link ${isActive==='mpr'? 'active': ''}`}>
                                <i className="nav-icon fas fa-book" />
                                <p>MPR</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/attendance" className={`nav-link ${isActive==='attendance'? 'active': ''}`}>
                                <i className="nav-icon far fa-calendar-alt" />
                                <p>Attendance</p>
                            </Link>
                        </li>
                    </React.Fragment>
                    }
                    {loginUserDetail.type === 'candidate' && 
                    <React.Fragment>
                        {loginUserDetail.status !== 'Approved' &&
                            <li className="nav-item">
                            <Link to="/file-upload" className={`nav-link ${isActive==='doc_upload'? 'active': ''}`}>
                                <i className="nav-icon nav-icon nav-icon fas fa-file" />
                                <p>Documents Upload</p>
                            </Link>
                        </li>}
                        <li className="nav-item">
                            <Link to="/monthly-preformance-report" className={`nav-link ${isActive==='mpr'? 'active': ''}`}>
                                <i className="nav-icon fas fa-book" />
                                <p>MPR</p>
                            </Link>
                        </li>
                    </React.Fragment>}
                </ul>
            </nav>
        </div>
        </aside>
        <aside className="control-sidebar control-sidebar-dark">
        </aside>
        </React.Fragment>
    )
}
export default SideBar;
