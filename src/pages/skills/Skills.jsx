import { useState, useEffect, useRef } from 'react';
import Skill from "./../../common/models/Skill"
import skillService from '../../service/skillService';

const Skills = () => {
  
  
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(new Skill("", "", ""))
  const [skillsList, setSkillsList] = useState([]);

  const saveSkillComponent = useRef();
  const deleteSSkillComponent = useRef();

  useEffect(() => {
    skillService.getAllSkills().then((response) => {
      setSkillsList(response.data);
    })
  }, [])


  const createSkillRequest = () => { 
    setSelectedSkill(new Skill("", "", ""));
    //saveSkillComponent.current?
  }

  const editSkillRequest = (item) => {

  }

  const deleteSkillRequest = () => {

  }
  
  
  return (
    <div>
      <div className="container">
        <div className="pt-5">
          {errorMessage &&
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          }
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <h3>All Skills</h3>
                </div>
                <div className="col-6 text-end">
                  <button className="btn btn-primary" onClick={() => createSkillRequest()}>
                      Create a Skill
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Skill Name</th>
                      <th scope="col">Skill Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skillService.map((item, index) => 
                      <tr key={item.id}>
                        <th scope="row">{index+1}</th>
                        <td>{item.skillName}</td>
                        <td>{item.skillDescription}</td>
                        <td>
                          <button className="btn btn-primary me-1" onClick={() => editSkillRequest(item)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => deleteSkillRequest(item)}>Delete</button>
                        </td>
                      </tr>
                    
                    )}
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Skills