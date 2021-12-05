import React,{ useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
// css is drived from Register.css page: i.e ../RegistrationPage/Register.css
import './mpr.css'
const MPR = () => {
    const [DateOfMPR, setDateOfMPR] = useState('');
    const [DateOfJoining, setDateOfJoining] = useState('');
    const [WorkPeriodFrom, setWorkPeriodFrom] = useState('');
    const [WorkPeriodTo, setWorkPeriodTo] = useState('');
    
    const [mpr_details, setmpr_details] = useState({
        proj_num: "", 
        work_order_num: "",
        name:"",
        designation:"",
        absent:""
    });

    // Error
    const [proj_numError, setproj_numError] = useState('');
    const [work_order_numError, setwork_order_numError] = useState('');
    const [DateOfMPRError, setDateOfMPRError] = useState('');
    const [nameError, setnameError] = useState('');
    const [designationError, setdesignationError] = useState('');
    const [DateOfJoiningError, setDateOfJoiningError] = useState('');
    const [WorkPeriodError, setWorkPeriodError] = useState('');
    const [WorkPeriodFromError, setWorkPeriodFromError] = useState('');
    const [WorkPeriodToError, setWorkPeriodToError] = useState('');
    const [absentError, setabsentError] = useState('');
    
    useEffect(() => {
        // const data = async () => {
        //     const 
        // }
    })

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log({...user});
        setmpr_details({ ...mpr_details, [name]: value});
    }

    const PostData = async (e) => {
        e.preventDefault();
        
        //Object Destructuring
        const { proj_num,
            work_order_num,
            name,
            designation, 
            absent,
        } = mpr_details;
            console.log("--", mpr_details)

        if (absent!=='')
            setabsentError('');
        else
            setabsentError('**Required');

        if (WorkPeriodFrom!=='' && WorkPeriodTo!=='')
            setWorkPeriodError('');
        else if(WorkPeriodFrom==='' && WorkPeriodTo==='')
            setWorkPeriodError('**Please write Work Period Start Date and End Date');
        else if(WorkPeriodFrom!=='')
            setWorkPeriodError('**Please write Work Period Start');
        else if(WorkPeriodTo!=='')
            setWorkPeriodError('**Please write Work Period Ends');

        if(WorkPeriodFrom!=='')
            setWorkPeriodFromError('');
        else{
            setWorkPeriodFromError('**Required');
        }
            
        if(WorkPeriodTo!=='')
            setWorkPeriodToError('');
        else{
            setWorkPeriodToError('**Required');
        }

        if(proj_num!=='')
            setproj_numError('');
        else
            setproj_numError('**Required');

        if(DateOfMPR!=='')
            setDateOfMPRError('');
        else
            setDateOfMPRError('**Required');
        
        if(name!=='')
            setnameError('');
        else
            setnameError('**Required');
        
        if(designation!=='')
            setdesignationError('');
        else
            setdesignationError('**Required');

        if(work_order_num!=='')
            setwork_order_numError('');
        else
            setwork_order_numError('**Required');
        
        if(DateOfJoining!=='')
            setDateOfJoiningError('');
        else
            setDateOfJoiningError('**Required');
        
    }
    return (
    <React.Fragments>

        <section className="register_content">

            <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-lg-9 col-xl-7">
                    <div className="card shadow-2-strong card-registration" style={{borderRadius: 15}}>
                    <div className="card-body p-4 p-md-5">                    
                    <Link to='/monthly-preformance-report'><span class="iconify cancel_cross_mpr" data-icon="fxemoji:cancellationx" data-width="20" data-height="20"></span></Link>
                        <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center">Monthly Performance Report</h1>
                        <form>
                            <div className="row">
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                                    <DatePicker 
                                                            className="form-control form-control-lg" 
                                                            selected={DateOfMPR}
                                                            onChange={date => setDateOfMPR(date)}
                                                            dateFormat = "yyyy/MM/dd"
                                                            placeholderText="Today Date: YYYY/MM/DD"                                            
                                                        />
                                                    {DateOfMPRError&&<div className="err-msg">{DateOfMPRError}</div>}
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <input type="text" className="form-control form-control-lg" placeholder='Project Number' onChange={handleInputs} name="proj_num" id="proj_num" autoComplete="off" value = {mpr_details.proj_num} />
                                {proj_numError&&<div className="err-msg">{proj_numError}</div>}
                            </div>
                            </div>
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                    <input type="text" className="form-control form-control-lg" onChange={handleInputs} placeholder='Work Order Number' name="work_order_num" id="work_order_num" autoComplete="off" value = {mpr_details.work_order_num} />
                                    {work_order_numError&&<div className="err-msg">{work_order_numError}</div>}
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4 d-flex align-items-center">
                            <div className="form-outline datepicker w-100">
                                <input type="text" className="form-control form-control-lg" placeholder='Name' onChange={handleInputs} name="name" id="name" autoComplete="off" value = {mpr_details.name} />
                                {nameError&&<div className="err-msg">{nameError}</div>}
                            </div>
                            </div>
                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                <div className="form-outline datepicker w-100">
                                    <DatePicker
                                        className="form-control form-control-lg" 
                                        selected={DateOfJoining}
                                        onChange={date => setDateOfJoining(date)}
                                        dateFormat = "yyyy/MM/dd"
                                        placeholderText="Date Of Joining: YYYY/MM/DD"                                            
                                    />
                                    {DateOfJoiningError&&<div className="err-msg">{DateOfJoiningError}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-4 d-flex align-items-center">
                                <div className="form-outline datepicker w-100">
                                    <input type="text" className="form-control form-control-lg" placeholder='Person Designation' onChange={handleInputs} name="designation" id="designation" autoComplete="off" value = {mpr_details.designation} />
                                    {designationError&&<div className="err-msg">{designationError}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                                <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                    <DatePicker 
                                        className="form-control form-control-lg" 
                                        selected={WorkPeriodFrom}
                                        onChange={date => setWorkPeriodFrom(date)}
                                        dateFormat = "yyyy/MM/dd"
                                        placeholderText="Work Start Date:yyyy/mm/dd"                                 
                                    />
                                    {WorkPeriodFromError&&<div className="err-msg">{WorkPeriodFromError}</div>}
                                </div>
                                </div>
                                <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <DatePicker 
                                    className="form-control form-control-lg" 
                                    selected={WorkPeriodTo}
                                    onChange={date => setWorkPeriodTo(date)}
                                    dateFormat = "yyyy/MM/dd"
                                    placeholderText="Work End Date: yyyy/mm/dd"                                            
                                />
                                {WorkPeriodToError&&<div className="err-msg">{WorkPeriodToError}</div>}
                            </div>
                            </div>
                        
                        </div>
                        
                        <div className="row">
                                <div className="col-md-12 mb-4 pb-2">
                                <div className="form-outline">
                                    <input type="text" class="form-control form-control-lg" placeholder='Absent'onChange={handleInputs} name="absent" id="absent" autoComplete="off" value = {mpr_details.absent} />
                                    {absentError&&<div className="err-msg">{absentError}</div>}
                            </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-2">
                            <input type = 'submit' className="btn btn-block btn-primary btn-lg" type="submit" onClick = {PostData}  name="signup" id="signup" defaultValue="Submit" />   
                        </div>
                        <div className="mt-4 pt-2">
                            <Link to='/monthly-preformance-report'>
                                <input type = 'submit' className="btn btn-block btn-danger btn-lg" type="submit" id="cancel" value="Cancel" />
                            </Link>     
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
                    
        </section>   
    
    </React.Fragments>
    )
}
export default withRouter(MPR);
