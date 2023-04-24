import React, {useState, useEffect} from 'react'
import skillService from '../../service/skillService';
import { Link } from 'react-router-dom';

const Skills = () => {



  const [errorMessage, setErrorMessage] = useState("");
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    skillService.getAllSkills().then((response) => {
      setSkillsList(response.data);
    });
  }, [])

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          {errorMessage && (
            <div className='alert alert-danger'>{errorMessage}
          </div>
          )}
          <div className="card">
            <div className="card-header">
            <div className="row">
              <div className="col-6">
                <h3>Employee Skill</h3>
              </div>
              <div className="col-5">
                <Link to="/dashboard" className="btn btn-link" style={{color:"black"}}>Back to Dashboard</Link>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Skill Name</th>
                      <th scope="col">Skill Description</th>
                    </tr>
                    </thead>
                    <tbody>
                      {skillsList.map((item, index) =>(
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.skillName}</td>
                          <td>{item.skillDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills;