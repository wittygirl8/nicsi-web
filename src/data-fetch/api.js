import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export  async function register  (dataRequest)  {
    try {
        console.log("dataRequest", dataRequest)
        const response = await axios.post(`${baseURL}/register`, dataRequest.requestData);

        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export async function getAttendance (token, dataRequest) {
    try {
        const response = await axios.post(baseURL+'/get-attendance', dataRequest, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function updateAttendance (token, dataRequest) {
    try {
        const response = await axios.post(baseURL+'/update-attendance', dataRequest, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export  async function signin  (dataRequest)  {
    try {
        console.log("dataRequest", dataRequest)
        const response = await axios.post(`${baseURL}/sign-in`, dataRequest);

        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export  async function AdminSignin  (dataRequest)  {
    try {
        console.log("dataRequest", baseURL)
        const response = await axios.post(`${baseURL}/admin-sign-in`, dataRequest);

        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export  async function CandidateSignin  (dataRequest)  {
    try {
        console.log("dataRequest", dataRequest)
        const response = await axios.post(`${baseURL}/candidate-sign-in`, dataRequest);

        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export  async function getAllUser  (token)  {
    try {
        
        const response = await axios.post(`${baseURL}/get-all-user`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export  async function getLoginUser  (token)  {
    try {
        const response = await axios.post(`${baseURL}/get-login-user`, { headers: {"Authorization" : `Bearer ${token}`} });
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export  async function getLoginCandidate  (token)  {
    try {
        const response = await axios.post(`${baseURL}/get-login-candidate`, { headers: {"Authorization" : `Bearer ${token}`} });
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export  async function getLoginAdmin  (token)  {
    try {
        const response = await axios.post(`${baseURL}/get-login-admin`, { headers: {"Authorization" : `Bearer ${token}`} });
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export  async function  getUserApprove (token, dataRequest)  {
    try {
        // console.log("dataRequest", dataRequest)
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(`${baseURL}/get-user-approve`, dataRequest, { headers: {"Authorization" : `Bearer ${token}`} });
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function createProject (dataRequest, token) {
    try {
        const response = await axios.post(`${baseURL}/create-project`, dataRequest, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getAllProject (token) {
    try {
        console.log(token)
        const response = await axios.post(`${baseURL}/get-all-projects`, {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function deleteProject (token, id) {
    try {
        console.log(token, id)
        const response = await axios.post(baseURL+'/delete-project', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getUserById (token, id) {
    try {
        console.log(token, id)
        const response = await axios.post(baseURL+'/get-user-by-id', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export async function getCoordinatorProjectsById(token, id){
    try {
        console.log(token, id)
        const response = await axios.post(baseURL+'/get-user-project-by-id', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}
export async function getCandidateById (token, id) {
    try {
        const response = await axios.post(baseURL+'/get-candidate-by-id', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getEachCandidateById (token, id) {
    try {
        const response = await axios.post(baseURL+'/get-each-candidate-by-id', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getCandidateByProject (token, id) {
    try {
        console.log(token, id)
        const response = await axios.post(baseURL+'/get-all-candidate-by-project', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function createWorkOrder (token, dataRequest) {
    try {
        const response = await axios.post(baseURL+'/create-work-order', dataRequest, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function createAttendance (token, dataRequest) {
    try {
        const response = await axios.post(baseURL+'/create-attendance', dataRequest, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function projectById (token, id) {
    try {
        console.log("dfffffd",token, id)
        const response = await axios.post(baseURL+'/get-project-by-id', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getAllWorkOrder (token) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/get-all-work-order', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function deleteWorkOrder (token, id) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/delete-work-order', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getWorkOrderById (token, id) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/get-work-order-by-id', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function updateWorkOrder (token, DataRequest) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/update-work-order', {DataRequest}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function updateProject (token, DataRequest) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/update-project', {DataRequest}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getApprovedUser (token) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/get-approved-user', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getApprovedCandidate (token) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/get-approved-candidate', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getPendingCandidate (token) {
    try {
        const response = await axios.post(baseURL+'/get-pending-candidate', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getRejectCandidate (token) {
    try {
        const response = await axios.post(baseURL+'/get-reject-candidate', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getPendingUser (token) {
    try {
        const response = await axios.post(baseURL+'/get-pending-user', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function getRejectUser (token) {
    try {
        const response = await axios.post(baseURL+'/get-reject-user', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function logoutAdmin (token) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/logout-admin', {token}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function logoutUser (token) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/logout-user', {token}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function logoutCandidate (token) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/logout-candidate', {token}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function updatependingStatus (token, dataRequest) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/update-pending-candidate', {dataRequest}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function createUser (token, dataRequest) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/create-user', {dataRequest}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function updateUser (token, dataRequest, id) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/update-user', {dataRequest, id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}


export async function updateUserPassword (token, dataRequest, id) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/update-user-password', {dataRequest, id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function deleteUser (token, id) {
    try {
        console.log(token)
        const response = await axios.post(baseURL+'/delete-user', {id}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function uploadDocument (token, formData) {
    try {
        console.log(token)
        let headers = new Headers();
        // headers.set("content-type", "multipart/form-data");
        headers.set("Authorization",  `Bearer ${token}`);
        const response = await axios.post(baseURL+'/upload-document', formData,{ headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    } catch (error) {
        return []
    }
}

export async function updateCandidateDesignation(token, dataRequest){
    try{
        console.log(token)
        const response = await axios.post(baseURL+'/update-designation', {dataRequest}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        if(response) {
            return response.data;
        }else {
            return []
        }
    }
    catch (error) {
        return []
    }
}
