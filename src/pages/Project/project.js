import React, { useEffect, useState }from 'react'
import { withRouter } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link } from 'react-router-dom';
import {getAllProject, deleteProject} from '../../data-fetch/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
const Project = () => {
    
  const user = useSelector(selectUser);
  const [projectList, setProjectList] = useState([]);
  const [totalNumber, setTotalNumber] = useState();
    useEffect(() => {
        // var localStorageData = localStorage.getItem( "userDetails" )
        // localStorageData = JSON.parse( localStorageData);
        // setToken(localStorageData.token)
        const data = async () => {
            
            const response = await getAllProject(user.token);
            setTotalNumber(response.project.length)
            setProjectList(response.project);
        }
        data()
    }, [])
    const handleDelete = async (id) => {
        // const response = await deleteProject(token, id)
        Swal.fire({
            type: 'success',
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "btn btn-danger", 
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'No, deny it'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteProject(user.token, id)
                if(response.status === 200) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: "Successfully Deleted!"
                        }
                    )
                    const data = async () => {
                        var response = await  getAllProject(user.token);
                        setProjectList(response.project)
                    }
                    data();
                }else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      'Cancelled',
                    )
                }
            }
        })
    }
    return (
        <React.Fragment>
            <Header/>
            <SideBar  isActive={"project"}/>
            {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <h5><strong>TOTAL:{" ",totalNumber}</strong></h5>
            <Link to='/create-project' className='create-btn'>Create</Link>
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
                    {projectList && projectList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{moment(item.start_date).format('DD/MM/YYYY')}</td>
                                <td>{moment(item.end_date).format('DD/MM/YYYY')}</td>
                                <td>{item.required_period}</td>
                                <td>{moment(item.end_date).isAfter(moment())? "Processing": "Completed"}</td>
                                {<td> 
                                    <Link to={`/edit-project/${item._id}`}><button className="btn btn-primary" style={{"marginRight": "10px"}} >Edit</button></Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td> }
                            </tr>
                        )
                    })}
                </tbody> }
            </table>
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        </div>
            <Footer />
        </React.Fragment>
    )
};

export default withRouter(Project);
