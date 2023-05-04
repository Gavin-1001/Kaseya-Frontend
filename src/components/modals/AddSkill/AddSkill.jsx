import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
  } from "react";
  import Skill from "../../../common/models/Skill";
  import skillService from "../../../service/skillService";
  import { Modal } from "react-bootstrap";
import AddSkillToEmployee from "../../../common/models/AddSkillToEmployee";
import AddSkillToEmployeeService from "../../../service/AddSkillToEmployeeService";
import Employee from "../../../common/models/Employee";

  
  const AddSkill = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      //interaction with parent
      showAddSkillModal() {
        setTimeout(() => {
          setShow(true);
        }, 0);
      },
    }));
  
    useEffect(() => {
      setSkill(props.skill);
    }, [props.skill]);
  
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState("");
    const [show, setShow] = useState(false);
    const [skill, setSkill] = useState(new Skill("", "", ""));
    const [employee, setEmployee] = useState(
      new Employee("", "", "", "", "", "", "", "")
    );
//    const [employeeSelect, setEmployeeSelect] = useState(new Employee());
    // eslint-disable-next-line
    const [infoMessage, setInfoMessage] = useState("");
  
    const saveSkill = (e) => {
      e.preventDefault();
      setSubmitted(true);
  
      if (!skill.skillName || !skill.skillDescription) {
        return;
      }
      skillService
        .saveSkill(skill)
        .then((response) => {
        //   props.onSaved(response.data);
          setShow(false);
          setSubmitted(false);
        })
        .catch((err) => {
          setErrorMessage("THERE WAS AN UNEXPECTED ERROR");
          console.log(err);
        });
    };

    const saveSkillToEmployee = (skill, employee) => { //skill belonged here (employee)
        console.log("THIS IS THE CURRENT EMPLOYEE "+employee.id)
         
        const addSkillToEmployee = new AddSkillToEmployee(employee.id, skill.skillId);

        AddSkillToEmployeeService.saveAddSkillToEmployee(addSkillToEmployee).then(() => {
            setInfoMessage("THIS FINALLY WORKS!!!!");
        }).catch((err) => {
            setErrorMessage("THERE WAS AN ERROR");
            console.log(err);

        })
    }
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setSkill((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    };
  
    return (
      <Modal show={show}>
        <form
          onSubmit={(e) => saveSkill(e)}
          noValidate
          className={submitted ? "was-validated" : ""}
        >
          <div className="modal-header">
            <h5 className="modal-title">Skills Details</h5>
            <button
              type="submit"
              className="btn-close"
              onClick={() => setShow(false)}
            ></button>
          </div>
  
          <div className="modal-body">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
          </div>
  
          <div className="form-group">
            <label htmlFor="skillName">Skill Name</label>
            <input
              type="text"
              name="skillName"
              placeholder="Skill Name"
              className="form-control"
              value={Skill.skillName}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Skill Name is required!!</div>
          </div>
  
          <div className="form-group">
            <label htmlFor="skillDescription">Skill Description</label>
            <input
              type="text"
              name="skillDescription"
              placeholder="Skill Description"
              className="form-control"
              value={Skill.skillDescription}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Skill Description is required!!</div>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>CLOSE</button>
              <button type="submit" className="btn btn-primary" onClick={() => saveSkillToEmployee(skill, employee)}>SAVE SKILL</button>
          </div>
        </form>
      </Modal>
    );
  });
  
  export default AddSkill;
  