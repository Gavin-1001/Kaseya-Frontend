import { BASE_API_URL } from "../api/baseUrl";
import { authHeaders } from "../common/AuthHeaders";
import axios from "axios";

const API_URL = BASE_API_URL + '/api/employees';

class employeeService {
    
    addEmployee(employee){
        return axios.post(API_URL, employee, {headers: authHeaders()});
    }

    getAllEmployees(){
        return axios.get(API_URL);
    }

    deleteEmployee(employee){
        return axios.delete(API_URL, + '/' + employee.id, {headers: authHeaders()});
    }

    updateEmployee(employee){
        return axios.put(API_URL, + '/' + employee.id, {headers: authHeaders()});
    }
}

export default new employeeService();