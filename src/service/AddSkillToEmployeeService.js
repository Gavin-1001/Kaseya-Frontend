import { BASE_API_URL } from "../api/baseUrl";
import { authHeaders } from "../common/AuthHeaders";

import axios from "axios";

const API_URL = BASE_API_URL + "/api/addSkillToEmployee";

    //addSkillToEmployee => is the userId and the skillId joined

class AddSkillToEmployeeService {

  // saveAddSkillToEmployee(addSkillToEmployee) {
  //   return axios.post(API_URL, addSkillToEmployee, { headers: authHeaders() });
  // }

  
  saveAddSkillToEmployee(addSkillToEmployee) {
    return axios.post(API_URL, addSkillToEmployee, { headers: authHeaders() });
  }
  

  getAllAddSkillToEmployeeItems(){
    return axios.get(API_URL, {headers: authHeaders()});
  }

}


export default new AddSkillToEmployeeService();