import React from 'react'
import moment from 'moment';
import './modalinnercontent.css'
const ModalInnerContent = ({data}) => {
    return (
        <React.Fragment>
        <div className='container'>
 
            <div className='row mt-5'>
                                                <div className='col-lg-12' style={{marginTop:'-3rem'}}>
                                                    <h1>{data.fullname}</h1>
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Name : </strong> {data.fullname}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Email : </strong> {data.email}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Contact Number : </strong> No Contact
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Date of Joining : </strong> {data.date_of_joining}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Date of Birth : </strong> {moment(data.date_of_birth).format('YYYY-MM-DD')}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Father's Name : </strong> {data.father_name}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Experience : </strong> {data.expereince}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Skills : </strong> {data.skills}
                                                </div>
                                                           <div className='col-lg-12 col-md-12 col-sm-12 address_heading'>
                                                Address
                                                </div>
                                                               <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent Flat : </strong>  {data.permanent_flat}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Current Flat : </strong>  {data.current_flat}
                                                </div>
                                                                  <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent Premise : </strong>{data.current_premise}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Current Premise : </strong> {data.permanent_premise}
                                                </div>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent Road : </strong> {data.current_road}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Current Road : </strong> {data.permanent_road}
                                                </div>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent Area : </strong> {data.current_area}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Current Area : </strong> {data.permanent_area}
                                                </div>
                                                                   <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent Pincode : </strong> {data.current_pincode}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Pincode : </strong> {data.permanent_pincode}
                                                </div>
                                                                 <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent State : </strong>  {data.current_state}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>State : </strong> {data.permanent_state}
                                                </div>                                          
                                                               <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Permanent Country : </strong> {data.permanent_country}
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-6 popup_content '>
                                                    <strong>Country : </strong> {data.current_country}
                                                </div>
                                            </div> 
        </div>                            
        </React.Fragment>
    )
}
export default ModalInnerContent;