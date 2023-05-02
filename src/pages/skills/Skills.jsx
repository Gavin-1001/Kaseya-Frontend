

import { useEffect, useRef, useState } from "react";
import Skill from "../../common/models/Skill";
import skillService from "../../service/skillService";
import SkillSave from "../../components/modals/Skills/SkillSave";
import { SkillDelete } from "../../components/modals/Skills/SkillDelete";

const Skills = () => {
  const [skillList, setSkillList] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(
    new Skill("", "", "")
  );
  const [errorMessage, setErrorMessage] = useState("");

  const saveSkillComponent = useRef();
  const deleteComponent = useRef();

  useEffect(() => {
    skillService.getAllSkills().then((response) => {
      setSkillList(response.data);
    });
  }, []);

  const createSkillRequest = () => {
    setSelectedSkill(new Skill("", "", ""));
    saveSkillComponent.current?.showSkillModal();
  };

  const editProductRequest = (item) => {
    setSelectedSkill(Object.assign({}, item));
    saveSkillComponent.current?.showSkillModal();
  };

  const deleteProductRequest = (skill) => {
    setSelectedSkill(skill);
    deleteComponent.current?.showDeleteModal();
  };

  const addSkill = (skill) => {
    console.log("SKILLsssss");
  }

  const saveSkillWatcher = (skill) => {
    let itemIndex = skillList.findIndex((item) => item.id === skill.id);

    if (itemIndex !== -1) {
      const newList = skillList.map((item) => {
        if (item.id === skill.id) {
          return skill;
        }
        return item;
      });
      setSkillList(newList);
    } else {
      const newList = skillList.concat(skill);
      setSkillList(newList);
    }
  };

  const deleteProduct = () => {
    skillService.deleteSkill(selectedSkill)
      .then((_) => {
        setSkillList(skillList.filter((x) => x.id !== selectedSkill.id));
      })
      .catch((err) => {
        setErrorMessage("Unexpected error occurred.");
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <h3>All Skills</h3>
                </div>

                <div className="col-6 text-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => createSkillRequest()}
                  >
                    Create Skill
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Skill Name</th>
                    <th scope="col">Skill Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skillList.map((item, ind) => (
                    <tr key={item.id}>
                      
                      <td>{item.skillName}</td>
                      <td>{item.skillDescription}</td>
                      <td>
                        <button
                          className="btn btn-primary me-1"
                          onClick={() => editProductRequest(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProductRequest(item)}
                        >
                          Delete
                        </button>
                        <button className="btn btn-primary me-"
                          onClick={() => addSkill(item)}>Add Skill</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <SkillSave
        ref={saveSkillComponent}
        skill={selectedSkill}
        onSaved={(p) => saveSkillWatcher(p)}
      />
      <SkillDelete
        ref={deleteComponent}
        onConfirmed={() => deleteProduct()}
      />
    </div>
  );
};

export { Skills };
