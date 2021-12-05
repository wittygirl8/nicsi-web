import React, {useState, useEffect} from 'react';
import moment from 'moment'
import { withRouter, Link } from 'react-router-dom';
import Header from '../../../Components/Header/Header'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/slice';
import {getLoginUser} from '../../../data-fetch/api.js';

const CoordinatorProjects = () => {
    const user = useSelector(selectUser);
    const [projectDetails, setProjectDetails] = useState([]);
    useEffect(() => {
        const loginUserDetailfunction = async () => {
            var response = await  getLoginUser(user.token);
            setProjectDetails(response.user.projects)
        }
        loginUserDetailfunction()            
    }, [])

    return (
        <React.Fragment>
            <Header/>
            <Sidebar isActive='assigned_project'/>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <table  className="table table-striped table-bordered table-hover" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S. NO.</th>
                                    <th scope="col">Project Name</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Required Period</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            { <tbody>
                                {projectDetails && (projectDetails).map((project, index) => {
                                    return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{project.name}</td>
                                        <td>{moment(project.start_date).format('DD/MM/YYYY')}</td>
                                        <td>{moment(project.end_date).format('DD/MM/YYYY')}</td>
                                        <td>{project.required_period}</td>
                                        <td>{moment(project.end_date).isAfter(moment())? "Processing": "Completed"}</td>
                                        {<td> 
                                            <Link to={`/project-details/${project._id}`}><button className="btn btn-primary" style={{"marginRight": "10px"}} >See Project</button></Link>
                                        </td> }
                                    </tr>)})}
                            </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default withRouter(CoordinatorProjects);
