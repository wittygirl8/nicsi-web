import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ModalContent from './ModalContent/ModalInnerContent';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {updatependingStatus, getApprovedCandidate, getCandidateById} from '../../data-fetch/api';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
const ApprovedCandiate = () => {
  const user = useSelector(selectUser);
    const [approvedUserList, setApprovedUserList] = useState([]);
    const [totalNumber, setTotalNumber] = useState();
    const [candidateDetail, setcandidateDetail] = useState({});
    const [showModal, setShowModal] = useState(false);

    const customStyles = {
        overlay: {
            zIndex: 1001
        },
        content:{
            top: '50%',
            left:'50%',
            right:'auto',
            bottom:'auto',
            marginRight:'-50%',
            transform:'translate(-50%, -50% )',
        }
    };

    useEffect(async () => {
        const data = async () => {
            
            const responseCandidate = await getApprovedCandidate(user.token)
            setTotalNumber(responseCandidate.dataUser.length);
            setApprovedUserList(responseCandidate.dataUser)
        }
        data()
    }, [])

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
                const requestData = {_id: id, status: "reject"}
                const userApproveResponse = await updatependingStatus(user.token, requestData)
                if(userApproveResponse.status === 200) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: "Rejected"
                        }
                    )
                    const data = async () => {
                        var response = await  getApprovedCandidate(user.token);
                        console.log(response)
                        setApprovedUserList(response.dataUser)
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

    const candidateDetails = async (id) => {
        console.log('id:',id);
                const candidateDetailResponse = await getCandidateById(user.token, id)
                if(candidateDetailResponse.status === 200) {
                        console.log('candidateDetailResponse:',candidateDetailResponse);
                        setcandidateDetail(candidateDetailResponse.user);
                        console.log('candidateDetail:',candidateDetail.user);
                        setShowModal(true)                    
                }
    }

    return (
        <React.Fragment>
            <Header/>
            <SideBar isActive={"approved"}/>     
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <h5 className='mb-4'><strong>TOTAL:{" ",totalNumber}</strong></h5>
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
                    {approvedUserList && approvedUserList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td> <button className="btn btn-success">{item.status}</button></td>
                                <td> 
                                    <button className="btn btn-danger" onClick={() =>handleDenyButton(item._id)}>Reject</button>
                                    <Link to={`/approve-candidate-designation/${item._id}`}><button className="btn btn-primary ml-5">{item.designation_name?'Edit Project':'Give Project'}</button></Link>
                                    <a onClick={()=>{candidateDetails(item._id)}}><Icon icon="mdi:alpha-i-circle-outline" color="gray"  width="30" height="40" style={{ marginLeft:'1rem'}}/>
                                    </a>

                                    <Modal style={customStyles} class="modalResponse content-wrapper" isOpen={showModal} onRequestClose={()=>setShowModal(false)} >
                                    <div className='container'>
                                            <div className='row text-center'>
                                                <div className='col-lg-12' style={{marginTop:'26rem'}}>
                                                    <div className='text-right'>
                                                        <button onClick={()=>{setShowModal(false)}} data-icon="fxemoji:cancellationx" style={{ borderRadius:'50%', border:'none', backgroundColor:'white', color:'maroon'}} data-width="20" data-height="20"><strong>X</strong>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='col-lg-12'>                                               
                                                    <ModalContent data = {candidateDetail}/> 
                                                </div>
                                                <div className='col-lg-12' style={{marginTop:'-7rem', marginBottom:'0rem'}}>  
                                                        <button className="btn btn-danger" onClick={()=>{setShowModal(false)}} >Close</button>
                                                </div>                                                                                                  
                                            </div>
                                        </div>
                                    </Modal>                                                    
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
export default withRouter(ApprovedCandiate);