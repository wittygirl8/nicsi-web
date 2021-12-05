import React,{ useEffect } from 'react'
import useState from 'react-usestateref'
import SideBar from '../../../Components/SideBar/SideBar';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import {Link, useParams} from  'react-router-dom';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/slice';
import {updateCandidateDesignation, getCandidateById, getAllProject} from '../../../data-fetch/api';

const CandidateProjectandDesignation = () => {
    const { id } = useParams();
    console.log('id',id)
    const history = useHistory();
    const user = useSelector(selectUser);
    const [ designationName, setDesignationName ] = useState('');
    const [ designationNameError, setDesignationNameError, designationNameErrorRef ] = useState('');

    const [projectNameList, setprojectNameList] = useState([]);
    const [assign_project, setassign_project] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            const dataResponse = await getAllProject(user.token, id)
            setprojectNameList(dataResponse.project)
            const response = await getCandidateById(user.token, id);
            if(response.user.designation_name) {
                setDesignationName(response.user.designation_name)
            }
        }
        fetchData()
    }, [])
    const PostData =async (e) => {
        e.preventDefault();
            if(designationName !== '')
                setDesignationNameError('')
            else
                setDesignationNameError('**Require')

                if(designationNameErrorRef.current === ''){
                    const dataRequest = {
                        _id: id,
                        designation_name:designationName,
                        projects: assign_project
                    }
                    console.log('dataRequest',dataRequest)
                    const data = await updateCandidateDesignation(user.token, dataRequest)
                        if(data.status === 200) {
                            history.push('/approved-candidates')
                        }
                }
    }
    const handleSave =async (e) => {
        e.preventDefault();
        if(designationName !== '')
            setDesignationNameError('')
        else
            setDesignationNameError('**Require')
        if(designationNameErrorRef.current  === ''){
            const dataRequest = {
                _id: id,
                designation_name:designationName,
                projects: assign_project
            }
            console.log('dataRequest',dataRequest)
            const data = await updateCandidateDesignation(user.token, dataRequest)
                if(data.status === 200) {
                    history.push('/approved-candidates')
                }
        }
    }
    return (
        <React.Fragment>
            <Header/>
            <SideBar isActive={"approved"}/>    
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration mt-5" style={{borderRadius: 15}}>
                                <div className="card-body p-4 p-md-5">                    
                                    <Link to='/approved-candidates'><span class="iconify cancel_cross_mpr" data-icon="fxemoji:cancellationx" data-width="20" data-height="20"></span></Link>
                                    <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center">Assign Project</h1>
                                    <form>
                                        <div className="row">
                                        <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" className="form-control form-control-lg" onChange={e => (setDesignationName(e.target.value))} placeholder='Assign Designation' name="designation_name" id="designation_name" autoComplete="off" value = {designationName?designationName: ''}/>
                                                    {designationNameError&&<div className="err-msg">{designationNameError}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                {<select className="form-control form-control-lg" name="assigned_project" multiple data-live-search="true" id="assigned_project" onChange={e => setassign_project([].slice.call(e.target.selectedOptions).map(item => item.value))} style={{ width:'100%', marginTop:'1rem'}}>
                                                    <option value="assigned_project" className='text-center disable'>------------------Select Project------------------</option>
                                                    {projectNameList.map((project, index) => {
                                                        console.log(project._id)
                                                        return (
                                                                <option key={index} value={project._id}>{project.name}</option>
                                                        )
                                                    })}
                                                </select>}
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-2">
                                                <input type='submit' className="btn btn-primary btn-lg btn-block" type="submit" onClick = {designationName?handleSave:PostData}  name="signup" id="signup" value={id?"Save": "Create"} />   
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
export default CandidateProjectandDesignation;
