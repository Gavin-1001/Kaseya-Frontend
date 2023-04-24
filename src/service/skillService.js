import axios from "axios"
import { BASE_API_URL } from "../api/baseUrl"
import { authHeaders } from "../common/AuthHeaders";



const SKILLS_API_URL = BASE_API_URL + '/api/'

class skillService{


    getAllSkills() {
        return axios.get(SKILLS_API_URL + 'getSkills');
    }

    addSkill(skill){
        return axios.post(SKILLS_API_URL, skill, {headers: authHeaders()})
    }

    getSkillById(skill){
        return axios.get(SKILLS_API_URL+"getSkillById/"+ skill.id)
    }
}
export default new skillService();