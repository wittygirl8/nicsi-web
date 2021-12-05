import React, { useEffect}from 'react'
import { withRouter } from 'react-router-dom';
import useState from 'react-usestateref'
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './dashboard.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '../../../node_modules/sweetalert2/dist/sweetalert2.css'
import {getAllUser, getLoginUser, getUserApprove, getLoginAdmin} from '../../data-fetch/api.js';
const Dashboard = () => {
    const [userData, setUserData] = useState([])
    const [loginUserDetail, setLoginUserDetail, loginUserRef] = useState({})
    useEffect(async () => {
        var localStorageData = localStorage.getItem( "userDetails" )
        localStorageData = JSON.parse( localStorageData);
        console.log(localStorageData.token)
        const data = async () => {
            var response = await  getAllUser(localStorageData.token);
            console.log(response)
            setUserData(response.dataUser)
        }
        if(localStorageData.userType === "admin") {
            data()
            
        }
        
    }, []);
    const handleApproveButton = (id) => {
        console.log("hee")
        Swal.fire({
            type: 'success',
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#5cb85c", 
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'No, deny it'
          }).then(async (result) => {
            if (result.isConfirmed) {
                var localStorageData = localStorage.getItem( "userDetails" )
                localStorageData = JSON.parse( localStorageData);
                const requestData = {_id: id, status: "Approved"}
                const userApproveResponse = await getUserApprove(localStorageData.token, requestData)
                console.log(userApproveResponse)
                if(userApproveResponse.status === 200) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: "Approved"
                        }
                    )
                    const data = async () => {
                        var response = await  getAllUser(localStorageData.token);
                        console.log(response)
                        setUserData(response.dataUser)
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
    console.log(userData)
    const handleDenyButton = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#DD6B55", 
            confirmButtonText: 'Yes, discard it!',
            cancelButtonText: 'No, deny it'
          }).then( async (result) => {
            if (result.isConfirmed) {
                var localStorageData = localStorage.getItem( "userDetails" )
                localStorageData = JSON.parse( localStorageData);
                const requestData = {_id: id, status: "Discard"}
                const userApproveResponse = await getUserApprove(localStorageData.token, requestData)
                if(userApproveResponse.status === 200) {
                    Swal.fire(
                        {
                            icon: 'trash',
                            title: 'Discard'
                        }
                    )
                    const data = async () => {
                        var response = await  getAllUser(localStorageData.token);
                        console.log(response)
                        setUserData(response.dataUser)
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
         <SideBar/>       
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
            <table  className="table table-striped table-bordered table-hover" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S. NO.</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {userData && userData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td> <button className="btn btn-warning">{item.status}</button></td>
                                <td> 
                                    <button className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => handleApproveButton(item._id)}>Approve</button>
                                    <button className="btn btn-danger" onClick={() => handleDenyButton(item._id)}>Discard</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        </div>

        <Footer/>
        </React.Fragment>
    )
}
export default withRouter(Dashboard);