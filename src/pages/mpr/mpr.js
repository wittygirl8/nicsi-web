import React, { useEffect }from 'react'
import { withRouter } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';

const Mpr = () => {
    return (
        <React.Fragment>
            <Header/>
            <SideBar isActive={"mpr"}/>
            {/* Content Wrapper. Contains page content */}
            
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
            <Link to='/monthly-preformance-form' className='create-btn'>Create</Link>
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
                {/* <tbody>
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
                </tbody> */}
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

export default withRouter(Mpr);
