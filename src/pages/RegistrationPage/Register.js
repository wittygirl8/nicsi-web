import React from 'react';
import useState from 'react-usestateref'
import './Register.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Header from '../../Components/Header/landingheader/formsheader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {register} from '../../data-fetch/api.js';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import validator from 'validator';
import { Icon } from '@iconify/react';

const Register = () => {
    const history = useHistory();
    // const [DateOfJoining, setDateOfJoining] = useState('');
    const[showPassword, setShowPassword] = useState(false);
    const [DateOfBirth, setDateOfBirth] = useState('');
    const [user, setUser] = useState({
        name: "", pan: "",gender: "", userType: "",email: "",pass: "", re_pass: "", 
        per_flt:'',
        per_premise:'',
        per_road:'',
        per_area:'',
        per_pincode:'',
        per_state:'',
        per_country:'',
        father_name:'',
        curr_flt:'',
        curr_premise:'',
        curr_road:'',
        curr_area:'',
        pincode:'',
        state:'',
        country:'',
        highest_qualification:'',
        experience:'',
        skills:'',
        contact:'',
        alt_num:''
    });

    // Error
    const [NameError, setNameError, NameErrorRef] = useState('');
    const [panError, setPanError, panErrorRef] = useState('');
    const [genderError, setgenderError, genderErrorRef] = useState('');   
    const [DateOfBirthError, setDateOfBirthError, DateOfBirthErrorRef] = useState('');
    const [emailError, setEmailError, emailErrorRef] = useState('');
    const [passError, setPassError, passErrorRef] = useState(''); 
    const [re_passError, setRe_passError, re_passErrorRef] = useState(''); 
    const [per_fltError, setPer_fltError, per_fltErrorRef] = useState(''); 
    const [per_premiseError, setper_premiseError, per_premiseErrorRef] = useState(''); 
    const [per_roadError, setper_roadError, per_roadErrorRef] = useState(''); 
    const [per_areaError, setper_areaError, per_areaErrorRef] = useState(''); 
    const [per_pincodeError, setper_pincodeError, per_pincodeErrorRef] = useState(''); 
    const [per_stateError, setper_stateError, per_stateErrorRef] = useState(''); 
    const [per_countryError, setper_countryError, per_countryErrorRef] = useState(''); 
    const [father_nameError, setfather_nameError, father_nameErrorRef] = useState(''); 
    const [curr_fltError, setcurr_fltError, curr_fltErrorRef] = useState(''); 
    const [curr_premiseError, setcurr_premiseError, curr_premiseErrorRef] = useState(''); 
    const [curr_roadError, setcurr_roadError, curr_roadErrorRef] = useState(''); 
    const [curr_areaError, setcurr_areaError, curr_areaErrorRef] = useState(''); 
    const [pincodeError, setpincodeError, pincodeErrorRef] = useState(''); 
    const [StateError, setstateError, StateErrorRef] = useState(''); 
    const [countryError, setcountryError, countryErrorRef] = useState(''); 
    const [highest_qualificationError, sethighest_qualificationError, highest_qualificationErrorRef] = useState(''); 
    const [experienceError, setexperienceError, experienceErrorRef] = useState(''); 
    const [skillsError, setskillsError, skillsErrorRef] = useState('');
    const [contactError, setcontactError, contactErrorRef] = useState('');

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value});
    }

    const PostData = async (e) => {
        e.preventDefault();
        //Object Destructuring
        const { name, pan , gender, email, pass, re_pass, per_flt, 
        per_premise,
        per_road,
        per_area,
        per_pincode,
        per_state,
        per_country,
        father_name,
        curr_flt,
        curr_premise,
        curr_road,
        curr_area,
        pincode,
        state,
        country,
        highest_qualification,
        experience,
        skills,
        contact,
        } = user;

        if(contact!==''){
            if(!validator.isNumeric(contact, '/^[0-9]+$/'))
                setcontactError('**Only Numbers');
            else
                setcontactError('');
        }
        else
            setcontactError('**Required');

        if(name!=='')
            setNameError('');
        else
            setNameError('**Required');

        if(DateOfBirth!=='')
            setDateOfBirthError('');
        else
            setDateOfBirthError('**Required');

        if(gender!=='')
            setgenderError('');
        else
            setgenderError('**Required');
        
        if(per_premise!=='')
            setper_premiseError('');
        else
            setper_premiseError('**Required');

        if(per_road!=='')
            setper_roadError('');
        else
            setper_roadError('**Required');

        if(per_area!=='')
            setper_areaError('');
        else
            setper_areaError('**Required');

        if(per_pincode!=='')
        {
            if(!validator.isNumeric(per_pincode, '/^[0-9]+$/'))
                setper_pincodeError('**Only Numbers');
            else
                setper_pincodeError('');
        }
        else
            setper_pincodeError('**Required');

        if(per_state!=='')
            setper_stateError('');
        else
            setper_stateError('**Required');
            
        if(per_country!=='')
            setper_countryError('');
        else
            setper_countryError('**Required');

        if(father_name!=='')
            setfather_nameError('');
        else
            setfather_nameError('**Required');

        if(curr_flt!=='')
            setcurr_fltError('');
        else
            setcurr_fltError('**Required');
            
        if(curr_premise!=='')
            setcurr_premiseError('');
        else
            setcurr_premiseError('**Required');

        if(curr_road!=='')
            setcurr_roadError('');
        else
            setcurr_roadError('**Required');

        if(curr_area!=='')
        {
                setcurr_areaError('');
        }
        else
            setcurr_areaError('**Required');
            
        if(pincode!=='')
        {
            if(!validator.isNumeric(pincode, '/^[0-9]+$/'))
                setpincodeError('**Only Numbers');
            else
                setpincodeError('');
        }
        else
            setpincodeError('**Required');

        if(state!=='')
            setstateError('');
        else
            setstateError('**Required');

        if(country!=='')
            setcountryError('');
        else
            setcountryError('**Required');
            
        if(highest_qualification!=='')
            sethighest_qualificationError('');
        else
            sethighest_qualificationError('**Required');

        if(experience!=='')
            if(!validator.isNumeric(contact, '/^[0-9]+$/'))
                setexperienceError('**Only Numbers');
            else
                setexperienceError('');
        else
            setexperienceError('**Required');

        if(skills!=='')
            setskillsError('');
        else
            setskillsError('**Required');

        if(pan!=='')
            setPanError('');
        else
            setPanError('**Required');

        if(per_flt!=='')
            setPer_fltError('');
        else
            setPer_fltError('**Required');

        if(email !==''){
            setEmailError('');
            if((email.indexOf('@')<=0) || (email.charAt(email.length - 4)!=".")&&(email.charAt(email.length - 4)!=".")){
                setEmailError('Invalid Email');
                return false;
            }
        }
        else{
            setEmailError('**Required');
        }
        if(pass !== ''){
            if (validator.isStrongPassword(pass, {
                minLength: 6, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) {
                setPassError('')
              } 
              else {
                setPassError('password must be minimum 6 digit long and contains: 1 lowercharecter, 1 upper charecter, 1 special symbol.');
              }
            }
        else
            setPassError('**Required: password must be minimum 6 digit long and contains: 1 lowercharecter, 1 upper charecter, 1 special symbol');

        if(re_pass !== ''){
            if(pass === re_pass){
                setRe_passError('');
            }
            else{
                setRe_passError('password doesn\'t match with conform password');
                return false;
            }
        }
        else{
            setRe_passError('**Required');
        }

        if(NameErrorRef.current === '' && panErrorRef.current=== '' && genderErrorRef.current === ''&& skillsErrorRef.current=== ''
        &&  DateOfBirthErrorRef.current === '' && experienceErrorRef.current === ''&& highest_qualificationErrorRef.current=== ''
        && countryErrorRef.current === '' && StateErrorRef.current === '' &&pincodeErrorRef.current === ''&& curr_areaErrorRef.current === ''
        && curr_roadErrorRef.current === ''&& curr_premiseErrorRef.current === ''&&curr_fltErrorRef.current=== ''
        && father_nameErrorRef.current === ''&& per_countryErrorRef.current === ''&& per_stateErrorRef.current === ''
        && per_pincodeErrorRef.current === '' && per_areaErrorRef.current === ''&& per_roadErrorRef.current === ''
        && per_premiseErrorRef.current === '' && per_fltErrorRef.current === ''&& re_passErrorRef.current=== ''
        && passErrorRef.current === '' && emailErrorRef.current === ''){
            const requestData = {
                "fullname": user.name,
                "pan_no": user.pan,
                "gender": user.gender,
                "date_of_joining": "12-12-12",
                "email": user.email,
                "date_of_birth": DateOfBirth,
                "current_flat": user.curr_flt,
                "current_premise": user.curr_premise,
                "current_road": user.curr_road,
                "current_area": user.curr_area,
                "current_pincode": user.pincode,
                "current_state": user.state,
                "current_country": user.country,
                "father_name": user.father_name,
                "permanent_flat": user.per_flt,
                "permanent_premise": user.per_premise,
                "permanent_road": user.per_road,
                "permanent_area": user.per_area,
                "permanent_pincode": user.per_pincode,
                "permanent_state": user.per_state,
                "permanent_country": user.per_country,
                "highest_qualification": user.highest_qualification,
                "expereince": experience,
                "skills": user.skills,
                "password": user.pass,
                "designation_name":'',
                "type": 'candidate',
                "status": "pending"
            }
            
            const registerResponse = await register({requestData});
            if(registerResponse.length !== 0) {
                console.log('registerResponse',registerResponse)
                if(registerResponse.status === 200) {
                    history.push("/sign-in");
                }
                else{
                    Swal.fire(
                        {
                            icon: 'warning',
                            title: "Try Again !"
                        }
                    )
                }
            }
        }
    }
    return (
        <React.Fragment>
        <Header/>
        <div className="register_content">       
            <section className="h-100 h-custom gradient-custom-2">
                <form method="POST" class="register-form" id="register-form">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" style={{borderRadius: 15}}>
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                        <div className="p-5">
                                        <h3 className="fw-normal mb-5" style={{color: '#4835d4'}}>General Infomation</h3>
                                        <div className="row">
                                            <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Examplev4" className="form-control form-control-lg" placeholder='Full Name (in Bank Account)' onChange={handleInputs} name="name" id="name" autoComplete="off" value = {user.name}/>
                                                    {NameError&&<div className="err-msg">{NameError}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" placeholder='PAN Number' className="form-control form-control-lg"  onChange={handleInputs} name="pan" id="pan" autoComplete="off" value = {user.pan}/>
                                                    {panError&&<div className="err-msg">{panError}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                <DatePicker 
                                                                className="form-control form-control-lg"
                                                                selected={DateOfBirth}
                                                                onChange={date => setDateOfBirth(date)}
                                                                dateFormat = "yyyy/MM/dd"
                                                                maxDate={new Date()}
                                                                placeholderText="Date Of Birth: YYYY/MM/DD"
                                                            />
                                                            {DateOfBirthError&&<div className="err-msg">{DateOfBirthError}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 pb-2">
                                            <div className="form-outline">                                            
                                                        <input type="text" className="form-control form-control-lg" onChange={handleInputs} value={user.father_name} name="father_name" id="father_name" placeholder="Father's Name"/>
                                                        {father_nameError&&<div className="err-msg">{father_nameError}</div>}    
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                            <div className="form-outline">
                                                        <div>
                                                            <label class="Head-label-Radio">
                                                                <span><span></span></span>Gender:</label>
                                                        </div>
                                                        <div className="radio_options">
                                                    
                                                            <span>
                                                                <input type="radio" name="gender" onChange={handleInputs} id="male" value="male" />
                                                                <label for="male" class="label-agree-term">
                                                                    <span><span></span></span>Male</label>
                                                            </span>

                                                            <span>
                                                                <input type="radio" name="gender" onChange={handleInputs} id="female" value="female"/>
                                                                <label for="female" class="label-agree-term">
                                                                    <span><span></span></span>Female</label>
                                                            </span>

                                                        </div>
                                                        <span class="label-agree-term"> {genderError&&<div className="err-msg">{genderError}</div>} </span>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="number" min='0' className="form-control form-control-lg" placeholder='Experience' onChange={handleInputs} value={user.experience} name="experience" id="experience" />
                                                    {experienceError&&<div className="err-msg">{experienceError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" placeholder='Highest Qualifications' onChange={handleInputs} value={user.highest_qualification} name="highest_qualification" id="highest_qualification" />
                                                    {highest_qualificationError&&<div className="err-msg">{highest_qualificationError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" placeholder='Permanent Flat' onChange={handleInputs} value={user.per_flt} name="per_flt" id="per_flt" Permanent/>
                                                    {per_fltError&&<div className="err-msg">{per_fltError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" placeholder='Permanent Premise' onChange={handleInputs} value={user.per_premise} name="per_premise" id="per_premise" Permanent/>
                                                    {per_premiseError&&<div className="err-msg">{per_premiseError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" placeholder='Permanent Road' onChange={handleInputs} value={user.per_road} name="per_road" id="per_road" Permanent/>
                                                    {per_roadError&&<div className="err-msg">{per_roadError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" onChange={handleInputs} placeholder="Permanent Area" value={user.per_area} name="per_area" id="per_area" Permanent/>
                                                    {per_areaError&&<div className="err-msg">{per_areaError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-5 mb-4 pb-2">
                                            <div className="form-outline form-white">
                                                <input type="text" className="form-control form-control-lg" onChange={handleInputs} placeholder="Permanent ZIP" value={user.per_pincode} name="per_pincode" id="per_pincode" Permanent />
                                                {per_pincodeError&&<div className="err-msg">{per_pincodeError}</div>}
                                            </div>
                                            </div>
                                            <div className="col-md-7 mb-4 pb-2">
                                            <div className="form-outline form-white">
                                                <input type="text" className="form-control form-control-lg" onChange={handleInputs} placeholder="Permanent State"  value={user.per_state} name="per_state" id="per_state" Permanent/>
                                                {per_stateError&&<div className="err-msg">{per_stateError}</div>}                                   
                                            </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" onChange={handleInputs} placeholder="Permanent Country" value={user.per_country} name="per_country" id="per_country" Permanent/>
                                                    {per_countryError&&<div className="err-msg">{per_countryError}</div>}                                   
                                                </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-7 mb-4 pb-2">
                                                <div className="form-outline form-white">
                                                </div>
                                            </div>
                                            <div className="col-md-5 mb-4 pb-2">
                                                <div className="form-outline form-white">
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                            
                                            <div className="col-lg-6 background_register_contact text-white">
                                                <div className="p-5">
                                                <h3 className="fw-normal mb-5">Contact Details</h3>
                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="email" className="form-control form-control-lg" placeholder='Email' onChange={handleInputs} value={user.email} name="email" id="email" />
                                                            {emailError&&<div className="err-msg">{emailError}</div>}
                                                    </div>
                                                </div>

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                        <div class="input-group mb-3">
                                                        <input type={showPassword?'text':'password'} className="form-control form-control-lg" placeholder='Password' aria-describedby="basic-addon1" onChange={handleInputs} value={user.pass} name="pass" id="pass"/>
                                                            <div class="input-group-prepend">
                                                                <button class="input-group-text" style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                                            </div>
                                                        </div>
                                                        {passError&&<div className="err-msg">{passError}</div>}
                                                    </div>
                                                </div>

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                        <div class="input-group mb-3">
                                                        <input type={showPassword?'text':'password'} className="form-control form-control-lg" placeholder='Confirm Password' aria-describedby="basic-addon1" onChange={handleInputs} value={user.re_pass} name="re_pass" id="re_pass"/>
                                                            <div class="input-group-prepend">
                                                                <button class="input-group-text" style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                                            </div>
                                                        </div>
                                                        {re_passError&&<div className="err-msg">{re_passError}</div>}                                    
                                                    </div>
                                                </div>

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Skills' onChange={handleInputs} value={user.skills} name="skills" id="skills"/>
                                                            {skillsError&&<div className="err-msg">{skillsError}</div>}     
                                                    </div>
                                                </div>

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Contact Number' onChange={handleInputs} value={user.contact} name="contact" id="contact"/>
                                                            {contactError&&<div className="err-msg">{contactError}</div>}                                   
                                                    </div>
                                                </div> 

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Current Flat' onChange={handleInputs} value={user.curr_flt} name="curr_flt" id="curr_flt" Current/>
                                                            {curr_fltError&&<div className="err-msg">{curr_fltError}</div>}                                   
                                                    </div>
                                                </div> 

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Current Premise' onChange={handleInputs} value={user.curr_premise} name="curr_premise" id="curr_premise" Current/>
                                                            {curr_premiseError&&<div className="err-msg">{curr_premiseError}</div>}                                   
                                                    </div>
                                                </div> 

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Current Road' onChange={handleInputs} value={user.curr_road} name="curr_road" id="curr_road" Current/>
                                                            {curr_roadError&&<div className="err-msg">{curr_roadError}</div>}                                   
                                                    </div>
                                                </div> 

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Current Area' onChange={handleInputs} value={user.curr_area} name="curr_area" id="curr_area" Current/>
                                                            {curr_areaError&&<div className="err-msg">{curr_areaError}</div>}                                   
                                                    </div>
                                                </div> 


                                                <div className="row">
                                                    <div className="col-md-5 mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                        <input type="text" className="form-control form-control-lg" placeholder='Current ZIP' onChange={handleInputs} value={user.pincode} name="pincode" id="pincode"/>
                                                        {pincodeError&&<div className="err-msg">{pincodeError}</div>}                                   
                                                    </div>
                                                    </div>
                                                    <div className="col-md-7 mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                        <input type="text" className="form-control form-control-lg" placeholder='State' onChange={handleInputs} value={user.state} name="state" id="state"/>
                                                        {StateError&&<div className="err-msg">{StateError}</div>}                                   
                                                    </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4 pb-2">
                                                    <div className="form-outline form-white">
                                                            <input type="text" className="form-control form-control-lg" placeholder='Country' onChange={handleInputs} value={user.country} name="country" id="country"/>
                                                            {countryError&&<div className="err-msg">{countryError}</div>}                                   
                                                    </div>
                                                </div>   
                                                <p style={{color:'white'}}>Already have an account? <Link to='/sign-in' className="link-info">Sign-in Here</Link></p>
                                                <input type="submit" name="signup" id="signup" className="btn btn-primary btn-lg btn-block" value="Sign Up" onClick = {PostData}/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </form>
            </section>

        </div>  
        </React.Fragment>        
    );
}
export default Register;