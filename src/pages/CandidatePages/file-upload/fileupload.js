import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useState from 'react-usestateref'
import SideBar from '../../../Components/SideBar/SideBar';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import {uploadDocument} from '../../../data-fetch/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/slice';
import Swal from 'sweetalert2/dist/sweetalert2.js';


const FileUpload = () => {
  const user = useSelector(selectUser);
  const [files, setfiles] = useState({
        adhar_card:"",
        pan_card:"",
        address_proof: "",
        tenth_marks_proof: "",
        twelfth_marks_proof: ""
    })
    const [filesName, setfilesName] = useState({
        adhar_card:"Choose Files",
        pan_card:"Choose Files",
        address_proof: "Choose Files",
        tenth_marks_proof: "Choose Files",
        twelfth_marks_proof: "Choose Files"
    })
    const [token, setToken] = useState('');
    const [adharfile, setAdharFile] = useState(null)
    const [panfile, setPanFile] = useState(null)
    const [aodfile, setaodFile] = useState(null)
    const [tenthfile, setTenthFile] = useState(null)
    const [twelfthfile, setTwelfthFile] = useState(null)
    useEffect(() => {
        // var localStorageData = localStorage.getItem( "userDetails" )
        // localStorageData = JSON.parse( localStorageData);
        // console.log(localStorageData.token)
        // setToken(localStorageData.token)
    }, [])

    const handleInput = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        console.log(name, file);
        setfiles({ ...files, [name]: file});
        setfilesName({ ...filesName, [name]: file.name});
    }
    
    const [adhar_cardError, setadhar_cardError, adhar_cardErrorRef] = useState('');
    const [pan_cardError, setpan_cardError, pan_cardErrorRef] = useState('');
    const [address_proofError, setaddress_proofError, address_proofErrorRef] = useState('');
    const [tenth_marks_proofError, settenth_marks_proofError, tenth_marks_proofErrorRef] = useState('');
    const [twelfth_marks_proofError, settwelfth_marks_proofError, twelfth_marks_proofErrorRef] = useState('');

    const {
        adhar_card,
        pan_card,
        address_proof,
        tenth_marks_proof,
        twelfth_marks_proof
    } = files;

    const PostFiles = async (e) => {
        e.preventDefault();

        // Object Destructuring
        const {
            adhar_card,
            pan_card,
            address_proof,
            tenth_marks_proof,
            twelfth_marks_proof
        } = files;

        if (adhar_card !== '')
            setadhar_cardError("");
        else
            setadhar_cardError("**Required");
        
        if (pan_card !== '')
            setpan_cardError("");
        else
            setpan_cardError("**Required");

        if (address_proof !== '')
            setaddress_proofError("");
        else
            setaddress_proofError("**Required");

        if (tenth_marks_proof !== '')
            settenth_marks_proofError("");
        else
            settenth_marks_proofError("**Required");
        
        if (twelfth_marks_proof !== '')
            settwelfth_marks_proofError("");
        else
            settwelfth_marks_proofError("**Required");

            console.log(files)
    }

    

    const adharUploadHandle = async (e) => {
        e.preventDefault()
        if (adharfile !== null)
            setadhar_cardError("");
        else{
            setadhar_cardError("**Required");
        }
        if(adhar_cardErrorRef.current =="") {
            const formData = new FormData()
            formData.append('file', adharfile[0])
            formData.append('name', 'adhar')
            
            console.log(formData)
            const uploadResponse = await uploadDocument(user.token, formData)
            if(uploadResponse.status === 200) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: "Successully Uploaded"
                    }
                )
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

    const panUploadHandle = async (e) => {
        e.preventDefault()
        if (panfile !== null)
            setpan_cardError("");
        else{
            setpan_cardError("**Required");
        }
        if(pan_cardErrorRef.current =="") {
            const formData = new FormData()
            formData.append('file', panfile[0])
            formData.append('name', 'pan_card')
            
            console.log(formData)
            const uploadResponse = await uploadDocument(user.token, formData)
            if(uploadResponse.status === 200) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: "Successully Uploaded"
                    }
                )
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
    const aodUploadHandle = async (e) => {
        e.preventDefault()
        if (aodfile !== null)
            setaddress_proofError("");
        else{
            setaddress_proofError("**Required");
        }
        if(address_proofErrorRef.current =="") {
            const formData = new FormData()
            formData.append('file', aodfile[0])
            formData.append('name', 'address_proof')
            
            console.log(formData)
            const uploadResponse = await uploadDocument(user.token, formData)
            if(uploadResponse.status === 200) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: "Successully Uploaded"
                    }
                )
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
    const tenthUploadHandle = async (e) => {
        e.preventDefault()
        if (tenthfile !== null)
            settenth_marks_proofError("");
        else{
            settenth_marks_proofError("**Required");
        }
        if(tenth_marks_proofErrorRef.current =="") {
            const formData = new FormData()
            formData.append('file', tenthfile[0])
            formData.append('name', 'tenth_marksheet')
            
            console.log(formData)
            const uploadResponse = await uploadDocument(user.token, formData)
            if(uploadResponse.status === 200) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: "Successully Uploaded"
                    }
                )
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

    const twelfthUploadHandle = async (e) => {
        e.preventDefault()
        if (twelfthfile !== null)
            settwelfth_marks_proofError("");
        else{
            settwelfth_marks_proofError("**Required");
        }
        if(twelfth_marks_proofErrorRef.current =="") {
            const formData = new FormData()
            formData.append('file', twelfthfile[0])
            formData.append('name', 'twelfth_marksheet')
            
            console.log(formData)
            const uploadResponse = await uploadDocument(user.token, formData)
            if(uploadResponse.status === 200) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: "Successully Uploaded"
                    }
                )
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
    return (
        <React.Fragment>
        <Header/>
        <SideBar isActive={"doc_upload"}/>
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2 justify-content-center">
            <form enctype="multipart/form-data">
                <div className='mt-4 ml-2'>
                    <p style={{ fontFamily:'sans-serif', fontSize:'22px', color:'#343a40'}}><strong>Adhar Card</strong></p>
                </div>
                <div className="custom-file">
                <div class="text-left">
                    <input type="file" name="file" className="form-control" onChange={(e)=>{setAdharFile(e.target.files)}} />
                    {adhar_cardError&&<div className="err-msg">{adhar_cardError}</div>}

                </div>
                    <div class="text-center">
                        <input type='submit'  className="btn btn-primary mt-3 btn-md" onClick={adharUploadHandle} value="Upload" />
                    </div>
                </div>
{/* pan_card */}
                <div className='mt-4 ml-2'>
                <p style={{ fontFamily:'sans-serif', fontSize:'22px', color:'#343a40'}}><strong>PAN Card</strong></p>
                </div>
                <div className="custom-file">
                    <input type="file" name="file" className="form-control" onChange={(e)=>{setPanFile(e.target.files)}} />
                    {pan_cardError&&<div className="err-msg">{pan_cardError}</div>}
                    <div class="text-center">
                        <input type='submit'  className="btn btn-primary mt-3 btn-md" onClick={panUploadHandle} value="Upload" />
                    </div>
                </div>

{/* address_proof */}
                <div className='mt-4 ml-2'>
                <p style={{ fontFamily:'sans-serif', fontSize:'22px', color:'#343a40'}}><strong>Address Proof</strong></p>
                </div>
                <div className="custom-file">
                <input type="file" name="file" className="form-control" onChange={(e)=>{setaodFile(e.target.files)}} />
                {address_proofError&&<div className="err-msg">{address_proofError}</div>}
                <div class="text-center">
                    <input type='submit'  className="btn btn-primary mt-3 btn-md" onClick={aodUploadHandle} value="Upload" />
                </div>
                </div>

{/* tenth_marks_proof */}
                <div className='mt-4 ml-2'>
                    <p style={{ fontFamily:'sans-serif', fontSize:'22px', color:'#343a40'}}><strong>10th Marks Sheet</strong></p>
                </div>
                <div className="custom-file">
                <input type="file" name="file" className="form-control" onChange={(e)=>{setTenthFile(e.target.files)}} />
                {tenth_marks_proofError&&<div className="err-msg">{tenth_marks_proofError}</div>}
                <div class="text-center">
                    <input type='submit'  className="btn btn-primary mt-3 btn-md" onClick={tenthUploadHandle} value="Upload"/>
                </div>
                </div>

{/* twelfth_marks_proof*/}
                <div className='mt-4 ml-2'>
                    <p style={{ fontFamily:'sans-serif', fontSize:'22px', color:'#343a40'}}><strong>12th Marks Sheet</strong></p>
                </div>
                <div className="custom-file">
                <input type="file" name="file" className="form-control" onChange={(e)=>{setTwelfthFile(e.target.files)}} />
                {twelfth_marks_proofError&&<div className="err-msg">{twelfth_marks_proofError}</div>}
                <div class="text-center">
                    <input type='submit'  className="btn btn-primary mt-3 btn-md" onClick={twelfthUploadHandle} value="Upload" />
                </div>
                </div>
            </form>
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
export default withRouter(FileUpload);