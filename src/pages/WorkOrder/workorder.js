import React, { useEffect, useState }from 'react'
import { withRouter } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar.js';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {getAllWorkOrder, deleteWorkOrder} from '../../data-fetch/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';

const Workorder = () => {
    const user = useSelector(selectUser);
    const [workOrderList, setWorkOrderList] = useState([])
    const [totalNumber, setTotalNumber] = useState();
    useEffect(() => {
        const data = async () => {
            const response = await getAllWorkOrder(user.token);
            setTotalNumber(response.data.length);
            setWorkOrderList(response.data);
        }
        data()
    }, []);
    const handleDeleteWorkOrder = async (id) => {
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
                const response = await deleteWorkOrder(user.token, id)
                if(response.status === 200) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: "Successfully Deleted!"
                        }
                    )
                    const data = async () => {
                        const dataResponse = await getAllWorkOrder(user.token)
                        setWorkOrderList(dataResponse.data)
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
            <SideBar isActive={"workorder"}/>
            {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
            <h5><strong>TOTAL:{' ', totalNumber}</strong></h5>
            <Link to='/create-work-order' className='create-btn'>Create</Link>
            <table  className="table table-striped table-bordered table-hover" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S. NO.</th>
                        <th scope="col">Work Order Number</th>
                        <th scope="col">IssueTo</th>
                        <th scope="col">Project</th>
                        <th scope="col">Action</th>
                    </tr>
                    
                </thead>
                { <tbody>
                    {workOrderList && workOrderList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.work_order_number}</td>
                                <td>{item.issue_to? item.issue_to.name: ""}</td>
                                <td>{item.project? item.project.name: ""}</td>
                                <td> 
                                    <button className="btn btn-warning" style={{"marginRight": "10px"}} onClick={() => (item._id)}>Download</button>
                                    <Link to={`/edit-work-order/${item._id}`}><button className="btn btn-primary" style={{"marginRight": "10px"}} >Edit</button></Link>
                                    <button className="btn btn-danger" onClick={() => handleDeleteWorkOrder(item._id)}>Delete</button>
                                </td>
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

export default withRouter(Workorder);
