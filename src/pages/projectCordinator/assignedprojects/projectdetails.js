import React, { useState, useEffect} from 'react'
import moment from 'moment'
import { withRouter, useParams, Link } from 'react-router-dom';
import Header from '../../../Components/Header/Header'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/slice';
import {getCoordinatorProjectsById,getCandidateByProject} from '../../../data-fetch/api.js';

const ProjectDetails = () => {
    const { id } = useParams();
    const user = useSelector(selectUser);
    const [projectDescription, setProjectDescription] = useState({
        name: '',
        proj_num:'', 
        hsn:'',
        desc:'',
        person_required:'',
        required_period:'',
        unit_rate_per_mnth:'',
        total_amount:'',
        cgst:'',
        sgst:'',
        igst:'',
        start_date:'',
        end_date:''
    });
    const [projectCandidate, setProjectCandidate] = useState([])
    useEffect(() => {
        const loginUserDetailfunction = async () => {
            const project = await getCoordinatorProjectsById(user.token,id)
            const projectsCandidates = await getCandidateByProject(user.token,id)
            console.log('projectsCandidates',projectsCandidates.candidate)
            setProjectDescription({
                name: project.data.name,
                proj_num: project.data.project_number, 
                hsn:project.data.hsn,
                desc:project.data.description,
                person_required:project.data.person_required,
                required_period:project.data.required_period,
                unit_rate_per_mnth:project.data.unit_rate,
                total_amount:project.data.total_amount,
                cgst:project.data.cgst,
                sgst:project.data.sgst,
                igst:project.data.igst,
                start_date:project.data.start_date,
                end_date:project.data.end_date
            })
            setProjectCandidate(projectsCandidates.candidate)
        }
        loginUserDetailfunction()            
    }, [])
    return (
        <React.Fragment>
            <Header/>
            <Sidebar isActive='assigned_project'/>
{/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>Project Detail</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to='/assigned-project' style={{color:'grey'}}>PROJECTS</Link></li>
                    <li className="breadcrumb-item active">PROJECT DETAIL</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            {/* Default box */}
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Project Details</h3>
                <div className="card-tools">
                <Link to='/assigned-project' type="button" className="btn btn-tool"  title="Remove">
                    <i className="fas fa-times" />
                </Link>
                </div>
            </div>
            <div className="card-body">
                <div className="row">

                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">


                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">Start Date</span>
                            <span className="info-box-number text-center text-muted mb-0">{moment(projectDescription.start_date).format('DD-MM-YYYY')}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">End Date</span>
                            <span className="info-box-number text-center text-muted mb-0">{moment(projectDescription.end_date).format('DD-MM-YYYY')}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                
                    <div className="row">
                    <div className="col-12 col-sm-4">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">Person Required</span>
                            <span className="info-box-number text-center text-muted mb-0">{projectDescription.person_required}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">Total Amount</span>
                            <span className="info-box-number text-center text-muted mb-0">{projectDescription.total_amount}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">Period Required</span>
                            <span className="info-box-number text-center text-muted mb-0">{projectDescription.required_period}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                
                    <div className="row">
                    <div className="col-12 col-sm-4">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">CGST</span>
                            <span className="info-box-number text-center text-muted mb-0">{projectDescription.cgst}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">SGST</span>
                            <span className="info-box-number text-center text-muted mb-0">{projectDescription.sgst}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="info-box bg-light">
                        <div className="info-box-content">
                            <span className="info-box-text text-center text-muted">IGST</span>
                            <span className="info-box-number text-center text-muted mb-0">{projectDescription.igst}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12">
                        <h3>Team Members</h3>
                        <table  className="table table-striped table-bordered table-hover" >
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S. NO.</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Experience</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Skills</th>
                                        <th scope="col">Actons</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectCandidate && projectCandidate.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.fullname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.expereince}</td>
                                                <td>{item.designation_name}</td>
                                                <td> {item.skills}</td>
                                                <td> 
                                                    <Link to={`/attendance/${item._id}`}><button className="btn btn-primary mt-1" style={{"marginRight": "10px"}}>Attendance</button></Link>
                                                    <Link to={`/mpr/${item._id}`}><button className="btn btn-primary ml-1 mt-1" style={{"marginRight": "10px"}}>MPR</button></Link>
                                                    {/* <button className="btn btn-danger" style={{"marginRight": "10px"}} onClick={() => handleDeleteButton(item._id)}>Delete</button> */}
                                                </td>
                                            </tr> 
                                        )
                                    })}
                                </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-info"><i className="fas fa-chart-pie"/> {projectDescription.name.toUpperCase()}</h3>
                    <p className="text-info">HSN/SAC Code: {projectDescription.hsn}</p>
                    <p className="text-muted">{projectDescription.desc}</p>
                    <br />
                </div>
                </div>
            </div>
            {/* /.card-body */}
            </div>
            {/* /.card */}
        </section>
        {/* /.content */}
        </div>
        {/* /.content-wrapper */}
            <Footer/>
        </React.Fragment>
    )
}
export default withRouter(ProjectDetails);
