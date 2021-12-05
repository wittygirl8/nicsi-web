import React, {useEffect} from  'react';
import { withRouter } from 'react-router-dom';
import useState from 'react-usestateref'
import { getAllProject, createUser, getUserById, updateUser, updateUserPassword } from '../../data-fetch/api'
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';
import validator from 'validator';
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Icon } from '@iconify/react';

import './project.css'
const ProjectCordinatoForm = () => {
    const[showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectUser);
  var history = useHistory();
    var {id} = useParams();
    const [DateOfProjectAssigned, setDateOfProjectAssigned] = useState('');
    const [WorkPeriodFrom, setWorkPeriodFrom] = useState('');
    const [WorkPeriodTo, setWorkPeriodTo] = useState('');
    const [changePassword, setChangePassword ] = useState(false);

    const [updatedPassword, setUpdatedPassword, updatedPasswordRef] = useState('');

    const [project_details, setproject_details] = useState({
        name:"",
        experience:"",
        designation:"",
        skills:"",
        email:"",
        phone_number:"",
        username:"",
        password:"",
        confirm_password:"",
        assign_project: []
    });

    // Error
    const [updatedPasswordError, setUpdatedPasswordError, updatedPasswordErrorRef] = useState('');
    const [nameError, setnameError, nameErrorRef] = useState('');   
    const [emailError, setEmailError, emailErrorRef] = useState('');
    const [phone_numberError, setphone_numberError, phone_numberErrorRef] = useState('');    
    const [usernameError, setusernameError, usernameErrorRef] = useState('');
    const [passwordError, setpasswordError, passwordErrorRef] = useState('');
    const [confirm_passwordError, setconfirm_passwordError, confirm_passwordErrorRef] = useState('');
    const [assign_projectError, setassign_projectError, assign_projectErrorRef] = useState('');
    const [experienceError, setexperienceError, experienceErrorRef] = useState('');
    const [designationError, setdesignationError, designationErrorRef] = useState('');
    const [skillsError, setskillsError, skillsErrorRef] = useState('');
    const [projectNameList, setprojectNameList] = useState([]);
    const [assign_project, setassign_project] = useState([]);
    useEffect(async() => {
        const dataResponse = await getAllProject(user.token, id)
        setprojectNameList(dataResponse.project)

        if(id) {
            const dataResponse = await getUserById(user.token, id)
            const projectArr = dataResponse.dataUser.projects.map((project) => {
                return project._id
            })
            setproject_details({
                name: dataResponse.dataUser.name,
                email: dataResponse.dataUser.email,
                designation: dataResponse.dataUser.designation,
                skills: dataResponse.dataUser.skills,
                username: dataResponse.dataUser.user_name,
                phone_number: dataResponse.dataUser.contact_number,
                experience: dataResponse.dataUser.expereince,
                assign_project: projectArr
        })
        }
    }, [])

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setproject_details({ ...project_details, [name]: value});
    }
    console.log("-->", assign_project)

    const PostData = async (e) => {
        e.preventDefault();
        
        //Object Destructuring
        const { 
            name,
            email,
            password,
            confirm_password,
            experience,
            designation,
            skills,
            phone_number,
            username
        } = project_details;

        if(name!=='')
            setnameError('');
        else{
            setnameError('**Required');
        }

        if(experience!=='')
            setexperienceError('');
        else{
            setexperienceError('**Required');
        }

        if(designation!=='')
            setdesignationError('');
        else{
            setdesignationError('**Required');
        }

        if(skills!=='')
            setskillsError('');
        else{
            setskillsError('**Required');
        }

        if(phone_number!=='')
        {
            if(!validator.isNumeric(phone_number, '/^[0-9]+$/'))
                setphone_numberError('**Only Numbers');
            else
                setphone_numberError('');
        }
        else
            setphone_numberError('**Required');

        if(username!=='')
            setusernameError('');
        else{
            setusernameError('**Required');
        }

        if(assign_project!=='')
            setassign_projectError('');
        else{
            setassign_projectError('**Required');
        }

        if(email !==''){
            setEmailError('');
            if((email.indexOf('@')<=0) || (email.charAt(email.length - 4)!=".")&&(email.charAt(email.length - 4)!=".")){
                setEmailError('Invalid Email');
                return false;
            }
        }else{
            setEmailError('**Required');
        }

        if(password !== ''){
            if (validator.isStrongPassword(password, {
                minLength: 6, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) {
                setpasswordError('')
              }else {
                setpasswordError('password must be minimum 6 digit long and contains: 1 lowercharecter, 1 upper charecter, 1 special symbol.');
              }
            }
        else
            setpasswordError('**Required: password must be minimum 6 digit long and contains: 1 lowercharecter, 1 upper charecter, 1 special symbol');

        if(confirm_password !== ''){
            if(password === confirm_password){
                setconfirm_passwordError('');
            }
            else{
                setconfirm_passwordError('password doesn\'t match with conform password');
                return false;
            }
        }
        else{
            setconfirm_passwordError('**Required');
        }
        console.log(assign_project)
        if(nameErrorRef 
            || emailErrorRef 
            || phone_numberErrorRef
            || usernameErrorRef 
            || passwordErrorRef 
            || confirm_passwordErrorRef
            || experienceErrorRef
            || designationErrorRef
            || skillsErrorRef
            || assign_projectErrorRef === '') {
                if(name && email && experience && password && assign_project && designation && skills && phone_number !== ''){
                    const dataRequest = {
                        name: name,
                        email: email,
                        expereince: experience,
                        password: password,
                        designation: designation,
                        skills: skills,
                        user_name: username,
                        contact_number: phone_number,
                        type:'user',
                        projects: assign_project
                    };
            console.log("--", dataRequest)
                    
                    const response = await createUser(user.token, dataRequest);
                    console.log("klkl",response)
                    if(response.status === 200) {
                        history.push('/project-cordinator')
                    }
                }
                
            }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        //Object Destructuring
        const {
            name,
            experience,
            designation,
            skills,
            email,
            phone_number,
            confirm_password,
            username
        } = project_details;
            console.log("---", assign_project)

        if(changePassword){
            if(updatedPassword !== '')
            {
                if (validator.isStrongPassword(updatedPassword, {
                    minLength: 6, minLowercase: 1,
                    minUppercase: 1, minNumbers: 1, minSymbols: 1
                  })) 
                  {
                    setUpdatedPasswordError('')
                  }
                  else 
                  {
                    setUpdatedPasswordError('password must be minimum 6 digit long and contains: 1 lowercharecter, 1 upper charecter, 1 special symbol.');
                  }
                }
                else
                    setUpdatedPasswordError('**Required: password must be minimum 6 digit long and contains: 1 lowercharecter, 1 upper charecter, 1 special symbol');
                
                if(confirm_password !== ''){
                    if(updatedPassword === confirm_password){
                        setconfirm_passwordError('');
                    }
                    else{
                        setconfirm_passwordError('password doesn\'t match with conform password');
                        return false;
                    }
                }
                else{
                    setconfirm_passwordError('**Required');
                }

                if(updatedPasswordErrorRef.current === '') {
                        if(updatedPassword!== ''){
                            const dataRequest = {
                                password:updatedPassword
                            };
                    console.log("--", dataRequest)
                            const response = await updateUserPassword(user.token, dataRequest, id);
                            if(response.status === 200) {
                                history.push('/project-cordinator')
                            }
                        }
                        
                    }

                    if(nameErrorRef 
                        || emailErrorRef 
                        || phone_numberErrorRef
                        || usernameErrorRef  
                        || confirm_passwordErrorRef
                        || experienceErrorRef
                        || designationErrorRef
                        || skillsErrorRef
                        || assign_projectErrorRef === '') {
                            if(name && email && experience && assign_project && designation && skills && phone_number !== ''){
                                const dataRequest = {
                                    name: name,
                                    email: email,
                                    expereince: experience,
                                    designation: designation,
                                    skills: skills,
                                    user_name: username,
                                    contact_number: phone_number,
                                    type:'user',
                                    projects: assign_project
                                };
                        console.log("--", dataRequest)
                                const response = await updateUser(user.token, dataRequest, id);
                                if(response.status === 200) {
                                    history.push('/project-cordinator')
                                }
                            }
                            
                        }
        }
    else
    {
        //Object Destructuring

            if(nameErrorRef 
                || emailErrorRef 
                || phone_numberErrorRef
                || usernameErrorRef  
                || confirm_passwordErrorRef
                || experienceErrorRef
                || designationErrorRef
                || skillsErrorRef
                || assign_projectErrorRef === '') {
                    if(name && email && experience && assign_project && designation && skills && phone_number !== ''){
                        const dataRequest = {
                            name: name,
                            email: email,
                            expereince: experience,
                            designation: designation,
                            skills: skills,
                            user_name: username,
                            contact_number: phone_number,
                            type:'user',
                            projects: assign_project
                        };
                console.log("--", dataRequest)
                        const response = await updateUser(user.token, dataRequest, id);
                        if(response.status === 200) {
                            history.push('/project-cordinator')
                        }
                    }
                    
                }
        }
    }
    return (
        <React.Fragment>
        <Header/>
        <SideBar isActive={"coordinator"}/> 
        <div className="content-wrapper">
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration mt-5" style={{borderRadius: 15}}>
                <div className="card-body p-4 p-md-5">                    
                <Link to='/project-cordinator'><span class="iconify cancel_cross_mpr" data-icon="fxemoji:cancellationx" data-width="20" data-height="20"></span></Link>
                    <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center">{id? "Edit Project Coordinator": "Create Project Coordinator"}</h1>
                    <form>
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="form-outline">
                                {<select className="form-control form-control-lg selectpicker" name="assigned_project" multiple data-live-search="true" id="assigned_project" onChange={e => setassign_project([].slice.call(e.target.selectedOptions).map(item => item.value))} style={{ width:'100%', marginTop:'1rem'}}>
                                            <option value="assigned_project" className='text-center'>-----------Select Project-----------</option>
                                            {projectNameList.map((project, index) => {
                                                console.log(project._id)
                                                return (
                                                        <option key={index} value={project._id}>{project.name}</option>
                                                )
                                            })}
                                        </select>}
                                        {assign_projectError&&<div className="err-msg">{assign_projectError}</div>}
                                </div>
                            </div>
                            <div className="col-md-12 mb-4">
                                <div className="form-outline">
                                    <input type="text" className="form-control form-control-lg"  placeholder='Name' onChange={handleInputs} name="name" id="name" autoComplete="off" value = {project_details.name} />
                                    {nameError&&<div className="err-msg">{nameError}</div>}
                                </div>
                            </div>
                            <div className="col-md-12 mb-4">
                                <div className="form-outline">
                                    <input type="text"  className="form-control form-control-lg"  placeholder='Username'  onChange={handleInputs} name="username" id="username" autoComplete="off" value = {project_details.username} />
                                    {usernameError&&<div className="err-msg">{usernameError}</div>}
                                </div>
                            </div>
                            <div className="col-md-12 mb-4">
                                <div className="form-outline">
                                    <input type="text" className="form-control form-control-lg"  placeholder='Designation' onChange={handleInputs} name="designation" id="designation" autoComplete="off" value = {project_details.designation} />
                                    {designationError&&<div className="err-msg">{designationError}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <input type="number"  min='0' className="form-control form-control-lg"  placeholder='Experience' onChange={handleInputs} name="experience" id="experience" autoComplete="off" value = {project_details.experience} />
                                    {experienceError&&<div className="err-msg">{experienceError}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">                                    
                                    <input type="text" className="form-control form-control-lg"  placeholder='Skills' onChange={handleInputs} name="skills" id="skills" autoComplete="off" value = {project_details.skills} />
                                    {skillsError&&<div className="err-msg">{skillsError}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <input type="text" className="form-control form-control-lg"  placeholder='Email' onChange={handleInputs} name="email" id="email" autoComplete="off" value = {project_details.email} />
                                    {emailError&&<div className="err-msg">{emailError}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    
                                    <input type="text" className="form-control form-control-lg"  placeholder='Contact Number' onChange={handleInputs} name="phone_number" id="phone_number" autoComplete="off" value = {project_details.phone_number} />
                                    {phone_numberError&&<div className="err-msg">{phone_numberError}</div>}
                                </div>
                            </div>
                            <div className={`small pb-lg-2 text-center ${id?``:`d-none`}`}> <button type="button" onClick={e=>(setChangePassword(!changePassword))} class="btn btn-outline-info">{changePassword?"Don't Change Pssword":"Change Password"}</button> </div>

                            {/*  Create Coordinator Pssword. */}
                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                <div class="input-group mb-3">
                                    <input  type={showPassword?'text':'password'} className={`form-control form-control-lg ${id?`d-none`:``}`}  placeholder='Password' aria-describedby="basic-addon1" onChange={handleInputs} name="password" id="password" autoComplete="off" value = {project_details.password} />
                                <div class="input-group-prepend">
                                    <button class={`input-group-text ${id?`d-none`:``}`} style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                </div>
                                {passwordError&&<div className="err-msg">{passwordError}</div>}
                            </div>

                                </div>
                            </div>
                            
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <div class="input-group mb-3">
                                    <input type={showPassword?'text':'password'}  className={`form-control form-control-lg ${id?`d-none`:``}`}  placeholder='Confirm Password' aria-describedby="basic-addon1" onChange={handleInputs} name="confirm_password" id="confirm_password" autoComplete="off" value = {project_details.confirm_password} />
                                    <div class="input-group-prepend">
                                        <button class={`input-group-text ${id?`d-none`:``}`} style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                    </div>
                                </div>
                                {confirm_passwordError&&<div className="err-msg">{confirm_passwordError}</div>}
                                </div>
                            </div>

                            {/*  Update Coordinator Password */}

                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                <div class="input-group mb-3">
                                    <input  type={showPassword?'text':'password'} className={`form-control form-control-lg ${changePassword?``:`d-none`}`}  placeholder='Password' aria-describedby="basic-addon1" onChange={e=>(setUpdatedPassword(e.target.value))} name="updatedPassword" id="updatedPassword" autoComplete="off" value = {updatedPassword} />
                                <div class="input-group-prepend">
                                    <button class={`input-group-text ${changePassword?``:`d-none`}`} style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                </div>
                                {updatedPasswordError&&<div className="err-msg">{updatedPasswordError}</div>}
                            </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <div class="input-group mb-3">
                                    <input type={showPassword?'text':'password'}  className={`form-control form-control-lg ${changePassword?``:`d-none`}`}  placeholder='Confirm Password' aria-describedby="basic-addon1" onChange={handleInputs} name="confirm_password" id="confirm_password" autoComplete="off" value = {project_details.confirm_password} />
                                    <div class="input-group-prepend">
                                        <button class={`input-group-text ${changePassword?``:`d-none`}`} style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                    </div>
                                </div>
                                {changePassword?confirm_passwordError&&<div className="err-msg">{confirm_passwordError}</div>:<div className='d-none'></div>}
                                </div>
                            </div>
                            
                            <div className="mt-4 pt-2">
                                <input type='submit' className="btn btn-block  btn-primary btn-lg" onClick = {id? handleSave: PostData}  name="signup" id="signup" defaultValue={id? "Save": "Create"} />   
                            </div>
                            <div className="mt-4 pt-2">
                                <Link to='/project-cordinator'>
                                    <input type='submit' className="btn btn-block btn-danger btn-lg" type="submit" id="cancel" value="Cancel" />
                                </Link>     
                            </div>
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
export default withRouter(ProjectCordinatoForm);
