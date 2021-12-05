import React, { useEffect } from  'react';
import { withRouter } from 'react-router-dom';
import useState from 'react-usestateref';
import { useParams } from "react-router-dom";
import {getAllProject, getAllUser, getUserById, createWorkOrder, projectById, getWorkOrderById, updateWorkOrder} from '../../data-fetch/api.js';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/slice';

export const WorkOrderForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const user = useSelector(selectUser);
    // Error
    const [proj_nameError, setproj_nameError] = useState('');
    const [contact_PersonError, setcontact_PersonError] = useState('');
    const [piNumberError,setPiNumberError] = useState('');

    // Declarations
    const [piNumber,setPiNumber] = useState('');
    const [project, setProject] = useState([]);
    const [project_name, setProject_name] = useState('');
    const [project_id, setProject_id] = useState('');
    const [userList, setUserList] = useState([]);
    const [userNameSelected, setUserNameSelected] = useState([]);
    const [userEmailSelected, setUserEmailSelected] = useState([]);
    const [userPhoneSelected, setUserPhoneSelected] = useState('');
    const [project_name_issue_to , setProject_name_issue_to] = useState('')
    useEffect(() => {
        const data = async () => {
            const response = await getAllProject(user.token);
            const responseUser = await getAllUser(user.token);
            setUserList(responseUser.dataUser)
            setProject(response.project)
        };
        data();

        const fetchData = async() => {
            if(id) {
                const responseWorkOrderById = await getWorkOrderById(user.token, id)

                if(responseWorkOrderById.data.issue_to !== null){
                    setUserNameSelected(responseWorkOrderById.data.issue_to._id)
                    setUserEmailSelected(responseWorkOrderById.data.issue_to.email)
                    setUserPhoneSelected(responseWorkOrderById.data.issue_to.contact_number)    
                }
                setPiNumber(responseWorkOrderById.data.pi_number)
                if(responseWorkOrderById.data.project !== null){
                    setProject_name(responseWorkOrderById.data.project._id)
                    setProject_id(responseWorkOrderById.data.project._id)
                    const responseProjectById = await projectById(user.token,responseWorkOrderById.data.project._id)
                    setProject_name_issue_to(responseProjectById.data.name);    
                }
            }
        }
        fetchData()
    }, [id])
    const handleProjectChange = async (e) => {
        setProject_name(e.target.value);
        setProject_id(e.target.value)
        const responseProjectById = await projectById(user.token, e.target.value)
        setProject_name_issue_to(responseProjectById.data.name);

    }

    const handleNameChange = async (e) => {
        setUserNameSelected(e.target.value);
        const responseGetUserById = await getUserById(user.token, e.target.value)
        setUserEmailSelected(responseGetUserById.dataUser.email);
        setUserPhoneSelected(responseGetUserById.dataUser.contact_number);
    }
    const PostData = async (e) => {
        e.preventDefault();
        
        if( project_name !== '')
            setproj_nameError('')
        else
            setproj_nameError('**Required')

        if(piNumber !== '')
            setPiNumberError('')
        else
            setPiNumberError('**Required')
     
        if( project_name_issue_to !== '')
            setcontact_PersonError('')
        else
            setcontact_PersonError('**Required')
        
        if(project_id || userNameSelected  !== '') {
            const DataRequest = {
                issue_to: userNameSelected,
                project: project_id,
                pi_number:piNumber
            }
            const data = await createWorkOrder(user.token, DataRequest)
            if(data.status === 200) {
                history.push('/work-order')
            }
        }
        
    }
    const handleSave =async (e) => {
        e.preventDefault();
        
        if(piNumber !== '')
            setPiNumberError('')
        else
            setPiNumberError('**Required')
            
        if( project_name_issue_to !== '')
            setcontact_PersonError('')
        else
            setcontact_PersonError('**Required')
        
        if( project_name !== '')
            setproj_nameError('')
        else
            setproj_nameError('**Required')

        if(project_id || userNameSelected  !== '') {
            const DataRequest = {
                _id: id,
                issue_to: userNameSelected,
                project: project_id,
                pi_number:piNumber
            }
            const data = await updateWorkOrder(user.token, DataRequest)
            if(data.status === 200) {
                history.push('/work-order')
            }
        }
    }
    return (
        <React.Fragment>
            <Header/>
            <SideBar  isActive={"workorder"}/>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-lg-9 col-xl-7">
                    <div className="card shadow-2-strong card-registration mt-5" style={{borderRadius: 15}}>
                    <div className="card-body p-4 p-md-5">               
                    <Link to='/work-order'><span class="iconify cancel_cross_mpr" data-icon="fxemoji:cancellationx" data-width="20" data-height="20"></span></Link>
                        <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center">{id? 'Edit Work Order Form': 'Create Work Order'}</h1>
                        <form>
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="form-outline">
                                        <select className="form-control form-control-lg" style={{marginTop: "10px"}} onChange={handleProjectChange} value={project_name}>
                                                        <option value="">Select Project Name</option>
                                                        {project&& project.map((data) => {
                                                    return (
                                                        <option value={data._id}>{data.name}</option>
                                                    )
                                                })}
                                            </select>
                                            {proj_nameError&&<div className="err-msg">{proj_nameError}</div>}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-outline">
                                    <input type="text" className="form-control form-control-lg" placeholder='PI Number' onChange={e => (setPiNumber(e.target.value))} name="piNumber" id="piNumber" autoComplete="off" value={piNumber?piNumber:''}/>
                                        {piNumberError&&<div className="err-msg">{piNumberError}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mb-4">
                                <h3>Issued To:-</h3>
                            </div>
                            <div className="col-md-12 mb-4">
                                <select className="form-control form-control-lg" value={userNameSelected} style={{marginTop: "10px"}} onChange={handleNameChange}>
                                    <option value=''>Select Contact Person</option>
                                    {userList && userList.map((user) => {
                                        return (
                                            <option value={user._id}>{user.name}</option>
                                    )
                                })}
                                </select>
                                {contact_PersonError&&<div className="err-msg">{contact_PersonError}</div>}
                            </div>
                            <div className='row'>
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <input type="text" className="form-control form-control-lg" placeholder='Email' name="email" id="email" autoComplete="off" value = {userEmailSelected?userEmailSelected: ''} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <input type="text" className="form-control form-control-lg" placeholder='Contact Number' name="phone_num" id="phone_num" autoComplete="off" value = {userPhoneSelected?userPhoneSelected:''} />
                                    </div>
                                </div>
                            </div>       
                            <div className="mt-4 pt-2">
                                <input type='submit' className="btn btn-primary btn-lg btn-block" type="submit" onClick = {id? handleSave: PostData}  name="signup" id="signup" value={id?"Save": "Create"} />   
                            </div>
                            <div className="mt-4 pt-2">
                                <Link to='/work-order'>
                                    <input type='submit' className="btn btn-danger btn-block btn-lg" type="submit" id="cancel" value="Cancel" />
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
export default withRouter(WorkOrderForm);