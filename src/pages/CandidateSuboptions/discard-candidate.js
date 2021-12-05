import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import {updatependingStatus, getRejectCandidate, getCandidateById} from '../../data-fetch/api';
import Modal from 'react-modal';
import moment from 'moment';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';

const DiscardCandidate = () => {
  const user = useSelector(selectUser);
  const [rejectCandidateList, setRejectCandidateList] = useState([]);
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

    useEffect(async() => {
        // var localStorageData = localStorage.getItem( "userDetails" )
        // localStorageData = JSON.parse( localStorageData);
        // setToken(localStorageData.token)
        const responseCandidate = await getRejectCandidate(user.token)
        setTotalNumber(responseCandidate.dataUser.length);
        setRejectCandidateList(responseCandidate.dataUser)
    }, [])
    const handleApproveButton = (id) => {
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
                const requestData = {_id: id, status: "Approved"}
                const userApproveResponse = await updatependingStatus(user.token, requestData)
                if(userApproveResponse.status === 200) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: "Approved"
                        }
                    )
                    const data = async () => {
                        var response = await  getRejectCandidate(user.token);
                        setRejectCandidateList(response.dataUser)
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
                const candidateDetailResponse = await getCandidateById(user.token, id)
                if(candidateDetailResponse.status === 200) {
                        setcandidateDetail(candidateDetailResponse.user);
                        setShowModal(true)                    
                }
    }
    return (
        <React.Fragment>
            <Header/>
            <SideBar isActive={"reject"}/>        
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
                    {rejectCandidateList && rejectCandidateList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td> <button className="btn btn-danger">{item.status}</button></td>
                                <td> 
                                    <button className="btn btn-primary" style={{"marginRight": "10px"}} onClick={() => handleApproveButton(item._id)}>Approve</button>
                                
                                    <a onClick={()=>{candidateDetails(item._id)}} ><Icon icon="mdi:alpha-i-circle-outline" color="gray"  width="30" height="40" style={{ marginLeft:'1rem'}}/>
                                    </a>
                                                        
                                    <div className="modal">
                                    <Modal style={customStyles} class="modalResponse content-wrapper content-header container-fluid" isOpen={showModal} onRequestClose={()=>setShowModal(false)} >
                                        <div><button type="button" onClick={()=>setShowModal(false)} class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h2 className="h2tit">{candidateDetail.fullname}</h2>
                                        </div>    
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Name : </strong> {candidateDetail.fullname}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Email : </strong> {candidateDetail.email}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Contact Number : </strong> No Contact
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Date of Joining : </strong> {candidateDetail.date_of_joining}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Date of Birth : </strong> {moment(candidateDetail.date_of_birth).format('YYYY-MM-DD')}
                                                                                    {/* {candidateDetail.date_of_birth}
                                                    {moment(candidateDetail.date_of_birth.toDate()).formate('YYYY-MM-DD')} */}
                                                    {/* {moment(candidateDetail.date_of_birth.toDate()).formate()} 
                                                    moment.tz('America/Los_Angeles').format('DD-MM-YYYY HH:MM:SS')*/}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Father's Name : </strong> {candidateDetail.father_name}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Experience : </strong> {candidateDetail.expereince}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Skills : </strong> {candidateDetail.skills}
                                                </div>
                    {/* Adderess */}
                                                <div className='col-lg-12 col-md-12 col-sm-12 address_heading'>
                                                Address
                                                </div>
                    {/* Adderess Flat*/}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent Flat : </strong>  {candidateDetail.permanent_flat}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Current Flat : </strong>  {candidateDetail.current_flat}
                                                </div>
                    {/* Adderess Premise*/}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent Premise : </strong>{candidateDetail.current_premise}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Current Premise : </strong> {candidateDetail.permanent_premise}
                                                </div>
                    {/* Adderess Road */}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent Road : </strong> {candidateDetail.current_road}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Current Road : </strong> {candidateDetail.permanent_road}
                                                </div>
                    {/* Adderess Area */}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent Area : </strong> {candidateDetail.current_area}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Current Area : </strong> {candidateDetail.permanent_area}
                                                </div>
                    {/* Adderess Pincode */}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent Pincode : </strong> {candidateDetail.current_pincode}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Pincode : </strong> {candidateDetail.permanent_pincode}
                                                </div>

                    {/* Adderess State */}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent State : </strong>  {candidateDetail.current_state}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>State : </strong> {candidateDetail.permanent_state}
                                                </div>
                    {/* Adderess Country */}
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Permanent Country : </strong> {candidateDetail.current_country}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content'>
                                                    <strong>Country : </strong> {candidateDetail.current_country}
                                                </div>


                                            </div>
                                        </div>                                                                            
                                        <button className="buttonModel" onClick={()=>{setShowModal(false)}} >Close</button>                                                        
                                    
                                    </Modal>
                                </div>
                                                    
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
export default withRouter(DiscardCandidate);