import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './features/slice';
import ProtectedRoute from './ProtectedRouter'

// Home-Page
import HomePage from './pages/landingpage/landingpage';

// Register-pages
import Register from './pages/RegistrationPage/Register.js';

// Login-pages
import Login from './pages/LoginPage/Login';
import AdminLogin from './pages/LoginPage/AdminLogin';
import CoordinatorLogin from './pages/LoginPage/coordinatorlogin';

// dashboard-page
import Dashboard from './pages/DashBoard/Dashboard';

// Project-Page
import ProjectForm from './pages/Project/projectform';
import Project from './pages/Project/project';

// WorkOrder-pages
import WorkOrder from './pages/WorkOrder/workorder.js';
import WorkOrderForm from './pages/WorkOrder/WorkOrderForm';

// mpr-pages
import Mpr from './pages/mpr/mpr.js';
import Monthly_Progress_Form from './pages/mpr/mprf';

// Project Cordinator pages
import ProjectCordinator from './pages/projectCordinator/projectCordinator';
import ProjectCordinatorForm from './pages/projectCordinator/projectCordinatorForm';
import ProjectCordinatorProjects from './pages/projectCordinator/assignedprojects/coordinatorprojects';
import ProjectDetails from './pages/projectCordinator/assignedprojects/projectdetails'

// Candidate Pages
import FileUpload from './pages/CandidatePages/file-upload/fileupload';
import Attendance from './pages/CandidatePages/Attendance/Attendance';
import ProjectDesignationPages from './pages/CandidateSuboptions/candidateprojectdesignation/candidateproject'

// Candidate-Suboptions pages
import ApprovedCandiate from './pages/CandidateSuboptions/approved-candiate';
import DiscardCandidate from './pages/CandidateSuboptions/discard-candidate';
import PendingCandidates from './pages/CandidateSuboptions/PendingCandidates';


const App = () =>{
  const user = useSelector(selectUser);
  console.log("user", user)
  return (
    <React.Fragment>
    <div className='wrapper'>
    <Router>
      <Switch>
        <ProtectedRoute path="/approved-candidates" component={ApprovedCandiate} isAuth={user} />
        <ProtectedRoute path="/reject-candidates" component={DiscardCandidate} isAuth={user} />
        <ProtectedRoute path="/pending-candidates" component={PendingCandidates} isAuth={user} />
        <ProtectedRoute path="/monthly-preformance-report" component={Mpr} isAuth={user} />
        <ProtectedRoute path={["/create-work-order","/edit-work-order/:id"]} component={WorkOrderForm} isAuth={user} />
        <ProtectedRoute path="/work-order" component={WorkOrder} isAuth={user} />
        <ProtectedRoute path={["/create-project", "/edit-project/:id"]} component={ProjectForm} isAuth={user} />
        <ProtectedRoute path="/file-upload" component={FileUpload} isAuth={user} />
        <ProtectedRoute path="/attendance/:id" component={Attendance} isAuth={user} />
        <ProtectedRoute path="/project" component={Project} isAuth={user} />
        <ProtectedRoute path="/monthly-preformance-form" component={Monthly_Progress_Form} isAuth={user} />
        <ProtectedRoute path="/monthly-preformance-report" component={Mpr} isAuth={user} />
        <ProtectedRoute path="/monthly-preformance-report" component={Project} isAuth={user} />
        <ProtectedRoute path="/work-order" component={WorkOrder} isAuth={user} />
        <ProtectedRoute path="/project-cordinator" component={ProjectCordinator} isAuth={user} />
        <ProtectedRoute path={["/create-project-coordinator", "/edit-project-coordinator/:id"]} component={ProjectCordinatorForm} isAuth={user} />
        <ProtectedRoute path="/approve-candidate-designation/:id" component={ProjectDesignationPages} isAuth={user} />
        <ProtectedRoute path="/assigned-project" component={ProjectCordinatorProjects} isAuth={user} />
        <ProtectedRoute path="/project-details/:id" component={ProjectDetails} isAuth={user} />
        
        <Route exact path="/">
          <HomePage/>
        </Route>

        <Route exact path="/sign-up">
          <Register/>
        </Route>
       
        
        <Route exact path="/sign-in">
          <Login/>
        </Route>
 
        <Route exact path="/admin-sign-in">
          <AdminLogin/>
        </Route>

        
        <Route exact path="/coordinator-sign-in">
          <CoordinatorLogin/>
        </Route>
      </Switch>
    </Router>
    </div>
    </React.Fragment>
    
  );
}
export default App;
