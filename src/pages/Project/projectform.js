import React, {useEffect} from  'react';
import { withRouter } from 'react-router-dom';
import useState from 'react-usestateref'
import DatePicker from 'react-datepicker';
import { createProject,projectById, updateProject } from '../../data-fetch/api.js'
import { useHistory, Link, useParams } from "react-router-dom"
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
const ProjectForm = () => {
  const user = useSelector(selectUser);
  var history = useHistory();
    var {id} = useParams();
    const [DateOfProjectAssigned, setDateOfProjectAssigned] = useState('');
    const [WorkPeriodFrom, setWorkPeriodFrom] = useState('');
    const [WorkPeriodTo, setWorkPeriodTo] = useState('');
    
    const [project_details, setproject_details] = useState({
        proj_num: "", 
        name:"",
        hsn:'',
        desc:'',
        no_per_req:'',
        req_per:'',
        unit_rate_per_mnth:"",
        total_amount:'',
        cgst:'',
        sgst:'',
        igst:''
    });

    // Error
    const [proj_numError, setproj_numError] = useState('');
    const [DateOfProjectAssignedError, setDateOfProjectAssignedError] = useState('');
    const [nameError, setnameError, nameErrorRef] = useState('');
    const [WorkPeriodFromError, setWorkPeriodFromError, WorkPeriodFromErrorRef] = useState('');
    const [WorkPeriodToError, setWorkPeriodToError, WorkPeriodToErrorRef] = useState('');
    const [hsnError, sethsnError] = useState('');

    const [descError, setdescError, descErrorRef] = useState('');
    const [no_per_reqError, setno_per_reqError, no_per_reqErrorRef] = useState('');
    const [req_perError, setreq_perError, req_perErrorRef] = useState('');
    const [unit_rate_per_mnthError, setunit_rate_per_mnthError, unit_rate_per_mnthErrorRef] = useState('');
    const [total_amountError, settotal_amountError] = useState('');
    const [cgstError, setcgstError] = useState('');
    const [sgstError, setsgstError] = useState('');
    const [igstError, setigstError] = useState('');
    
    useEffect(async() => {
        // var localStorageData = localStorage.getItem( "userDetails" )
        // localStorageData = JSON.parse( localStorageData);
        // setToken(localStorageData.token)
        if(id) {
            const dataResponse = await projectById(user.token, id)
            setWorkPeriodTo(new Date(dataResponse.data.end_date))
            setproject_details({
                hsn:dataResponse.data.hsn,
                total_amount:dataResponse.data.total_amount,
                cgst:dataResponse.data.cgst,
                sgst:dataResponse.data.sgst,
                igst:dataResponse.data.igst,
                name: dataResponse.data.name,
                proj_num: dataResponse.data.project_number,
                desc: dataResponse.data.description,
                req_per: dataResponse.data.required_period,
                no_per_req: dataResponse.data.person_required,
                unit_rate_per_mnth: dataResponse.data.unit_rate
                
            })
            setWorkPeriodFrom(new Date(dataResponse.data.start_date))
        }
    }, [])

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setproject_details({ ...project_details, [name]: value});
    }

    const PostData = async (e) => {
        e.preventDefault();
        
        //Object Destructuring
        const {
            name,
            hsn,
            desc,
            no_per_req,
            req_per,
            unit_rate_per_mnth,
            total_amount,
            cgst,
            sgst,
            igst
        } = project_details;

        if(desc!=='')
            setdescError('');
        else{
            setdescError('**Required');
        }

        if(no_per_req!=='')
            setno_per_reqError('');
        else{
            setno_per_reqError('**Required');
        }

        if(req_per!=='')
            setreq_perError('');
        else{
            setreq_perError('**Required');
        }

        if(unit_rate_per_mnth!=='')
            setunit_rate_per_mnthError('');
        else{
            setunit_rate_per_mnthError('**Required');
        }            
          
        if(total_amount!=='')
            settotal_amountError('');
        else{
            settotal_amountError('**Required');
        } 

        if(cgst!=='')
            setcgstError('');
        else{
            setcgstError('**Required');
        }

        if(sgst!=='')
            setsgstError('');
        else{
            setsgstError('**Required');
        }

        if(igst!=='')
            setigstError('');
        else{
            setigstError('**Required');
        }
        
        if(WorkPeriodFrom!=='')
            setWorkPeriodFromError('');
        else{
            setWorkPeriodFromError('**Required');
        }
           
        if(hsn!=='')
            sethsnError('');
        else{
            sethsnError('**Required');
        }

        if(WorkPeriodTo!=='')
            setWorkPeriodToError('');
        else{
            setWorkPeriodToError('**Required');
        }

        

        if(DateOfProjectAssigned!=='')
            setDateOfProjectAssignedError('');
        else
            setDateOfProjectAssignedError('**Required');
        
        if(name!=='')
            setnameError('');
        else
            setnameError('**Required');   
        if(nameErrorRef 
            || WorkPeriodFromErrorRef 
            || WorkPeriodToErrorRef
            || descErrorRef 
            || no_per_reqErrorRef 
            || req_perErrorRef
            || unit_rate_per_mnthErrorRef === '') {
                if(name && WorkPeriodFrom && WorkPeriodTo && desc && no_per_req && req_per && unit_rate_per_mnth !== ''){
                    const dataRequest = {
                        hsn: project_details.hsn,
                        name: project_details.name,
                        start_date: WorkPeriodFrom,
                        end_date: WorkPeriodTo,
                        description: project_details.desc,
                        person_required: project_details.no_per_req,
                        required_period: project_details.req_per,
                        unit_rate: project_details.unit_rate_per_mnth,
                        total_amount: project_details.total_amount,
                        cgst:project_details.cgst,
                        sgst:project_details.sgst,
                        igst:project_details.igst
                    };
                    
                    const response = await createProject(dataRequest, user.token);
                    if(response.status === 200) {
                        history.push('/project')
                    }
                }
                
            }
        
    }
    const handleSave = async (e) => {
        e.preventDefault();
        
        //Object Destructuring
        const { 
            proj_num,
            name,
            hsn,
            desc,
            no_per_req,
            req_per,
            unit_rate_per_mnth,
            total_amount,
            cgst,
            sgst,
            igst
        } = project_details;

        if(proj_num!=='')
            setproj_numError('')
        else{
            setproj_numError('**Required');
        }
        if(desc!=='')
            setdescError('');
        else{
            setdescError('**Required');
        }

        if(no_per_req!=='')
            setno_per_reqError('');
        else{
            setno_per_reqError('**Required');
        }

        if(req_per!=='')
            setreq_perError('');
        else{
            setreq_perError('**Required');
        }

        if(unit_rate_per_mnth!=='')
            setunit_rate_per_mnthError('');
        else{
            setunit_rate_per_mnthError('**Required');
        }            
          
        if(total_amount!=='')
            settotal_amountError('');
        else{
            settotal_amountError('**Required');
        } 

        if(cgst!=='')
            setcgstError('');
        else{
            setcgstError('**Required');
        }

        if(sgst!=='')
            setsgstError('');
        else{
            setsgstError('**Required');
        }

        if(igst!=='')
            setigstError('');
        else{
            setigstError('**Required');
        }
        
        if(WorkPeriodFrom!=='')
            setWorkPeriodFromError('');
        else{
            setWorkPeriodFromError('**Required');
        }
           
        if(hsn!=='')
            sethsnError('');
        else{
            sethsnError('**Required');
        }

        if(WorkPeriodTo!=='')
            setWorkPeriodToError('');
        else{
            setWorkPeriodToError('**Required');
        }

        

        if(DateOfProjectAssigned!=='')
            setDateOfProjectAssignedError('');
        else
            setDateOfProjectAssignedError('**Required');
        
        if(name!=='')
            setnameError('');
        else
            setnameError('**Required');  

        if(nameErrorRef 
            || WorkPeriodFromErrorRef 
            || WorkPeriodToErrorRef
            || descErrorRef 
            || no_per_reqErrorRef 
            || req_perErrorRef
            || unit_rate_per_mnthErrorRef === '') {
                if(name && WorkPeriodFrom && WorkPeriodTo && desc && no_per_req && req_per && unit_rate_per_mnth !== ''){
                    const dataRequest = {
                        _id: id,
                        hsn: project_details.hsn,
                        name: project_details.name,
                        start_date: WorkPeriodFrom,
                        end_date: WorkPeriodTo,
                        description: project_details.desc,
                        person_required: project_details.no_per_req,
                        required_period: project_details.req_per,
                        unit_rate: project_details.unit_rate_per_mnth,
                        total_amount: project_details.total_amount,
                        cgst:project_details.cgst,
                        sgst:project_details.sgst,
                        igst:project_details.igst
                    };
                    
                    const response = await updateProject(user.token, dataRequest);
                    if(response.status === 200) {
                        history.push('/project')
                    }
                }
                
            }
    }
    return (
        <React.Fragment>
            <Header/>
            <SideBar  isActive={"project"}/>
            <div className="content-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration mt-5" style={{borderRadius: 15}}>
                        <div className="card-body p-4 p-md-5">                    
                        <Link to='/project'><span class="iconify cancel_cross_mpr" data-icon="fxemoji:cancellationx" data-width="20" data-height="20"></span></Link>
                            <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center">{id? "Edit Project Order": "Create Project Order"}</h1>
                            <form>
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="text" className="form-control form-control-lg" placeholder='Project Name' onChange={handleInputs} name="name" id="name" autoComplete="off" value = {project_details.name} />
                                            {nameError&&<div className="err-msg">{nameError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="text" className="form-control form-control-lg" placeholder='HSN/SAC Code' onChange={handleInputs} name="hsn" id="hsn" autoComplete="off" value = {project_details.hsn} />
                                            {hsnError&&<div className="err-msg">{hsnError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="text" className="form-control form-control-lg" placeholder='Project Description' onChange={handleInputs} name="desc" id="desc" autoComplete="off" value = {project_details.desc} />
                                            {descError&&<div className="err-msg">{descError}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                        <DatePicker 
                                                    className="form-control form-control-lg"
                                                    selected={WorkPeriodFrom}
                                                    onChange={date => setWorkPeriodFrom(date)}
                                                    dateFormat = "yyyy/MM/dd"
                                                    placeholderText="Project Start Date:yyyy/mm/dd"   
                                                    style={{marginTop:'1rem'}}                                       
                                                />
                                            {WorkPeriodFromError&&<div className="err-msg">{WorkPeriodFromError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <DatePicker 
                                                    className="form-control form-control-lg"
                                                    selected={WorkPeriodTo}
                                                    onChange={date => setWorkPeriodTo(date)}
                                                    dateFormat = "yyyy/MM/dd"
                                                    placeholderText="Project End Date:yyyy/mm/dd" 
                                                    style={{marginTop:'1rem'}}                                                            
                                                />
                                            {WorkPeriodToError&&<div className="err-msg">{WorkPeriodToError}</div>}
                                        </div>
                                    </div>
                                
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="number" min='1' className="form-control form-control-lg" placeholder='No. of Persons Required[A]' onChange={handleInputs} name="no_per_req" id="no_per_req" autoComplete="off" value = {project_details.no_per_req} />
                                            {no_per_reqError&&<div className="err-msg">{no_per_reqError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="text" className="form-control form-control-lg" onChange={handleInputs} name="req_per" id="req_per" placeholder='Period: No. of Months/days[B]' autoComplete="off" value = {project_details.req_per} />
                                            {req_perError&&<div className="err-msg">{req_perError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="number" min='0.00' className="form-control form-control-lg" placeholder='Unit Rate per Month (excluding taxes) [C]' onChange={handleInputs} name="unit_rate_per_mnth" id="unit_rate_per_mnth" autoComplete="off" value = {project_details.unit_rate_per_mnth} />
                                            {unit_rate_per_mnthError&&<div className="err-msg">{unit_rate_per_mnthError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="number" min='0.00' className="form-control form-control-lg" placeholder='Total Amount (AxBxC)' onChange={handleInputs} name="total_amount" id="total_amount" autoComplete="off" value = {project_details.total_amount} />
                                            {total_amountError&&<div className="err-msg">{total_amountError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="number" min='0.00' className="form-control form-control-lg" placeholder='SGST (%)/Amount' onChange={handleInputs} name="cgst" id="cgst" autoComplete="off" value = {project_details.cgst} />
                                            {cgstError&&<div className="err-msg">{cgstError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="number" min='0.00' className="form-control form-control-lg" placeholder='SGST (%)/Amount' onChange={handleInputs} name="sgst" id="sgst" autoComplete="off" value = {project_details.sgst} />
                                            {sgstError&&<div className="err-msg">{sgstError}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <input type="number" min='0.00' className="form-control form-control-lg" placeholder='IGST (%)/Amount' onChange={handleInputs} name="igst" id="igst" autoComplete="off" value = {project_details.igst} />
                                            {igstError&&<div className="err-msg">{igstError}</div>}
                                        </div>
                                    </div>

                                </div>                
                                <div className="mt-4 pt-2">
                                    <input type='submit' className="btn btn-block btn-primary btn-lg" type="submit" onClick = {id? handleSave: PostData}  name="signup" id="signup" value={id?"Save": "Create"} />   
                                </div>
                                <div className="mt-4 pt-2">
                                    <Link to='/project'>
                                        <input type='submit' className="btn btn-block btn-danger btn-lg" type="submit" id="cancel" value="Cancel" />
                                    </Link>     
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>   
            <Footer/>
        </React.Fragment>
    )
}
export default withRouter(ProjectForm);
