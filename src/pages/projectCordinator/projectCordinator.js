import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar.js';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link } from 'react-router-dom';
import {getAllUser, deleteUser} from '../../data-fetch/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
const ProjectCordinator = () => {
  const user = useSelector(selectUser);
  const [userList, setUserList] = useState([])
  const [totalNumber, setTotalNumber] = useState();
    useEffect(async() => {
        const responseUser = await getAllUser(user.token)
        setTotalNumber(responseUser.dataUser.length)
        setUserList(responseUser.dataUser)
    }, [])

    const handleDeleteButton = async (id) => {
        Swal.fire({
            type: 'success',
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "btn btn-danger", 
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, deny it'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteUser(user.token, id)
                if(response.status === 200) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: "Successfully Deleted!"
                        }
                    )
                    const data = async () => {
                        const dataResponse = await getAllUser(user.token)
                        setUserList(dataResponse.dataUser)
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
            <SideBar isActive={"coordinator"}/>   
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <h5>TOTAL:{' ',totalNumber}</h5>
                            <Link to='/create-project-coordinator' className='create-btn'>Create</Link>
                            <table  className="table table-striped table-bordered table-hover" >
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S. NO.</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact Number</th>
                                        <th scope="col">Assigned Project</th>
                                        <th scope="col">Experience</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Skills</th>
                                        <th scope="col">Actons</th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {userList && userList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.contact_number}</td>
                                                <td>
                                                {item.projects.map((project) => {
                                                    return (
                                                        <ul>
                                                            <li>{project.name}</li>
                                                        </ul>
                                                    )
                                                })}</td>
                                                <td>{item.expereince}</td>
                                                <td>{item.designation}</td>
                                                <td> {item.skills}</td>
                                                <td> 
                                                    <Link to={`/edit-project-coordinator/${item._id}`}><button className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => (item._id)}>Edit</button></Link>
                                                    <button className="btn btn-danger" style={{"marginRight": "10px"}} onClick={() => handleDeleteButton(item._id)}>Delete</button>
                                                </td>
                                            </tr> 
                                        )
                                    })}
                                </tbody>
                            
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default withRouter(ProjectCordinator);