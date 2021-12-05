import React from 'react';
import useState from 'react-usestateref';
import {useDispatch} from 'react-redux';
import {login} from '../../features/slice'
import './Login.css';
import {AdminSignin} from '../../data-fetch/api.js';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AdminLogin = () => {
    const[showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    var history = useHistory();
    const [User_login, setUser_login] = useState({
        email:"",
        pass:"",
        userType: "admin"
    });
    const [emailError, setemailError, emailErrorRef] = useState('');
    const [passwordError, setPasswordError, passwordErrorRef] = useState('');  
    const [CredentialError, setCredentialError] = useState('');
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser_login({ ...User_login, [name]: value});
    }
    const PostData = async (e) => {
        e.preventDefault();

        //Object Destructuring
        const { email, pass, userType } = User_login;
        if(email !==''){
            setemailError('');
            if((email.indexOf('@')<=0) || (email.charAt(email.length - 4)!=".")&&(email.charAt(email.length - 4)!=".")){
                setemailError('**Invalid Email');
                // return false;
            }
        }
        else{
            setemailError('**Required');
        }

        if(pass !== ''){
            setPasswordError('')
        }
        else{
            setPasswordError('**Required');
        }
        if(emailErrorRef.current == '' && passwordErrorRef.current == '') {
            const requestData = {
                email,
                password: pass,
            }
            var signinResponse = ''
            signinResponse = await AdminSignin(requestData);
            // dispatch(login({
            //     token: signinResponse.data.token,
            //     userType,
            //     isloggedIn: true
            // }))
            if(signinResponse.length !== 0) {
                if(signinResponse.data.status === 200) {
                    console.log(userType)
                    dispatch(login({
                        token: signinResponse.data.token,
                        userType,
                        isloggedIn: true
                    }))
                    // const data = {
                    //     token: signinResponse.data.token,
                    //     userType
                    // }

                    // localStorage.setItem('userDetails', JSON.stringify(data));
        
                        if(signinResponse.data.user.type === 'admin'){
                            history.push("/pending-candidates");
                        }else if(signinResponse.data.user.type === 'candidate') {
                            history.push("/monthly-preformance-report");
                        }
                        else{
                            history.push("/assigned-project");
                        }
                    }
            }else  {
                setCredentialError("Invalid Credentials")
            }
            
        }
    }
    return (
        <React.Fragment>   
        <div className="home_content">
        <section style={{ overflow: 'none'}}>
            <div className="container-fluid">
                <div className="row">
                <div className="col-sm-6 text-black">
                    <div className="px-5 ms-xl-4">
                            <Link to="/" className='img'>
                                <img className="logo" src='/images/AeoTrans.png' alt="logo"/>
                            </Link>
                    </div>

                    <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n1">
                    <form style={{width: '23rem'}}>
                        <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1, color:'white'}}> Admin Sign In</h3>
                        {CredentialError&&<div className="err-credential-msg">{CredentialError}</div>}
                        <div className="form-outline mb-4">
                        <input type="text" className="form-control form-control-lg"  autoComplete="off" value={User_login.name} onChange={handleInput} name="email" id="email" placeholder="Your Email"/>
                        {emailError&&<div className="err-msg">{emailError}</div>}
                        </div>
                        <div className="form-outline mb-4">
                            <div class="input-group mb-3">
                                <input type={showPassword?'text':'password'} className="form-control form-control-lg" autoComplete="off"  aria-describedby="basic-addon1" value={User_login.pass} onChange={handleInput} name="pass" id="pass" placeholder="Password"/>
                                    <div class="input-group-prepend">
                                        <button class="input-group-text" style={{ borderRadius:'10%'}} onClick={e=>(e.preventDefault(), setShowPassword(!showPassword))} id="basic-addon1">{showPassword?<Icon icon="twemoji:eye"/>:<Icon icon="pepicons:eye-closed-print" />}</button>
                                    </div>
                            </div>
                            {passwordError&&<div className="err-msg">{passwordError}</div>}
                        </div>
                        <div className="pt-1 mb-4">
                            <input type="submit" name="signup" id="signup" className="btn btn-primary btn-lg btn-block" value="Sign In" onClick = {PostData}/>
                        </div>
                        <p className="small mb-5 pb-lg-2 text-center"><Link to='/sign-in' className="signup-image-link link-info"> Candidate Sign In </Link><Link to='/coordinator-sign-in' className="signup-image-link link-info ml-2"> Co-ordinator Sign In </Link></p>
                        <p style={{color:'white'}}>Don't have an account? <Link to='/sign-up' className="link-info">Sign Up Here</Link></p>
                    </form>
                    </div>
                
                </div>
                <div className="col-sm-6 px-0 d-none d-sm-block">
                    <img src="/images/aeologic_team.jpg" alt="Login image" className="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
                </div>
                </div>
            </div>
            </section>
        </div>
        </React.Fragment>
    )
}
export default AdminLogin;