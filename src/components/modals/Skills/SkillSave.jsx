import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Skill from "../../../common/models/Skill";
import skillService from "../../../service/skillService";
import { Modal } from "react-bootstrap";

const SkillSave = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    //interaction with parent
    showSkillModal() {
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

  const saveSkill = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!skill.skillName || !skill.skillDescription) {
      return;
    }
    skillService
      .saveSkill(skill)
      .then((response) => {
        props.onSaved(response.data);
        setShow(false);
        setSubmitted(false);
      })
      .catch((err) => {
        setErrorMessage("THERE WAS AN UNEXPECTED ERROR");
        console.log(err);
      });
  };

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
            value={skill.skillName}
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
            value={skill.skillDescription}
            onChange={(e) => handleChange(e)}
          />
          <div className="invalid-feedback">Skill Description is required!!</div>
        </div>
      </form>
    </Modal>
  );
});

export default SkillSave;
