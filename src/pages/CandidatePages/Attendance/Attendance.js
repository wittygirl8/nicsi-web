import React, { useEffect } from "react";
import useState from 'react-usestateref'
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { selectUser } from '../../../features/slice';
import SideBar from '../../../Components/SideBar/SideBar';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import DatePicker from "react-multi-date-picker";
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import { createAttendance, getEachCandidateById, updateAttendance, getAttendance } from '../../../data-fetch/api';

const Attendance = () => {
    const {id }= useParams();
    const history = useHistory();
    const user = useSelector(selectUser);
    const [candidate,setCandidate] = useState({});
    const [month, setMonth] = useState('');
    const [value, setValue] = useState([]);
    const [valueError, setValueError, valueErrorRef] = useState('');
    const [monthError, setMonthError, monthErrorRef] = useState('');
    useEffect(async () => {
        const data = async () => {
            const responseCandidate = await getEachCandidateById(user.token, id);
            console.log('responseCandidate.user',responseCandidate.user);
            setCandidate(responseCandidate.user);
        }
        data()
    }, [])

    const PostData = async (e) => {
        e.preventDefault();
        if(value !==['']){
            setValueError('')
        }
        else{
            setValueError('**Required');
        }

        if(month !==['']){
            setMonthError('')
        }
        else{
            setMonthError('**Required');
        }

        if(valueErrorRef.current===''||monthErrorRef.current===''){
            const dataRequest = {
                id : id,
                month: month,
                attendance : value
            }
            console.log('dataRequest',dataRequest)
                const response = await getAttendance(user.token, {id:id, month:month});
                console.log('getAttendance',response);
                if(response!== null){
                    const data = await updateAttendance(user.token, dataRequest)
                    if(data.status === 200) {
                        Swal.fire(
                            {
                                icon: 'success',
                                title: "Attendance Updated"
                            }
                        )
                    }
                    else{
                        const data = await createAttendance(user.token, dataRequest)
                        if(data.status === 200) {
                            Swal.fire(
                                {
                                    icon: 'success',
                                    title: "Attendance Register"
                                }
                            )
                        }    
                    }
                }
        }
    }
    return (
        <React.Fragment>
            <Header/>
            <SideBar isActive={"attendance"}/> 
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        
        <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration mt-5" style={{borderRadius: 15}}>
                    <div className="card-body p-4 p-md-5">                    
                        <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center">Attendance</h1>
                        <form>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h4 className="text-info">{candidate.fullname}</h4>
                                    <h4 className="text-info">{candidate.email}</h4>
                                    <h4 className="text-info">{candidate.designation_name}</h4>
                                </div>
                                <div className="col-md-12 mt-5 text-center">
                                    <div className="form-outline">
                                        <select className="form-control form-control-lg" style={{marginTop: "10px"}} onChange={e => {setMonth(e.target.value)}} value={month}>
                                                        <option value="" className="text-center">------------------Select Month Name------------------</option>
                                                        <option value="January">January</option>
                                                        <option value="February">February</option>
                                                        <option value="March">March</option>
                                                        <option value="April">April</option>
                                                        <option value="May">May</option>
                                                        <option value="June">June</option>
                                                        <option value="July">July</option>
                                                        <option value="August">August</option>
                                                        <option value="Septmber">Septmber</option>
                                                        <option value="October">October</option>
                                                        <option value="November">November</option>
                                                        <option value="December">December</option>
                                            </select>
                                            {monthError&&<div className="err-msg">{monthError}</div>}
                                    </div>
                                </div>
                                <div className="col-md-12 mt-5 text-center">
                                    <span className="col-md-6 " style={{ fontSize:'1.2rem' }}><strong>Dates:</strong></span>
                                        <DatePicker
                                                shouldCloseOnSelect={false}
                                                style={{ width:'100%'}}
                                                placeholder="Select Working Days"
                                                value={value} onChange={setValue} multiple plugins={[weekends()]} maxDate={new Date()} 
                                                mapDays={({ date }) => {
                                                let isWeekend = [0, 7].includes(date.weekDay.index)
                                                if (isWeekend) return {
                                                disabled: true,
                                                style: { color: "#ccc" },
                                                onClick: () => alert("weekends are disabled")
                                                }
                                            }}/>
                                            {valueError&&<div className="err-msg">{valueError}</div>}
                                </div>
                                <div className="col-md-12">
                                    <span className="col-md-6" >
                                        <textarea class="form-control" id="exampleFormControlTextarea1" value={value} rows="3"></textarea>
                                    </span>
                                </div>
                                <div className="mt-4 pt-2 text-center">
                                    <input className="btn btn-primary btn-lg" type="submit"  name="signup" id="signup" onClick={PostData} value='Submit' />   
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
export default withRouter(Attendance);