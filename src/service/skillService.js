import axios from "axios"
import { BASE_API_URL } from "../api/baseUrl"
import { authHeaders } from "../common/AuthHeaders";



const SKILLS_API_URL = BASE_API_URL + '/api/'

class skillService{


    getAllSkills() {
        return axios.get(SKILLS_API_URL + 'getSkills');
    }

    getSkillById(skill){
        return axios.get(SKILLS_API_URL+"getSkillById/"+ skill.id)
    }

    saveSkill(skill){
        return axios.post(SKILLS_API_URL + "skills/add", skill, {headers: authHeaders()})
    }
}
export default new skillService();