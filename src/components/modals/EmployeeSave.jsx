import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import Employee from "../../common/models/Employee";
import employeeService from "../../service/employeeService";
import "./EmployeeSave.css";
import Skill from "../../common/models/Skill";
import skillService from "../../service/skillService";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Select } from "react-dropdown-select";

const EmployeeSave = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    //interaction with parent
    showEmployeeModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  const [employee, setEmployee] = useState(
    new Employee("", "", "", "", "", "", "", "")
  );
  const [skill, setSkill] = useState(new Skill("", "", ""));

  ////
  const currentUser = useSelector((state) => state.user);
  //

  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setEmployee(props.employee);
  }, [props.employee]);

  const saveEmployee = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!currentUser.id) {
      return <Navigate to={{ pathname: "/login" }} />;
    }
    if (
      !employee.employeeFirstName ||
      !employee.employeeLastName ||
      !employee.employeeDateOfBirth ||
      !employee.employeeEmailAddress ||
      !skill.skillName ||
      !skill.skillDescription ||
      !employee.isActive ||
      !employee.employeeAge
    ) {
      return;
    }
    employeeService
      .addEmployee(employee)
      .then((response) => {
        //...
        props.onSaved(response.data);
        setShow(false);
        setSubmitted(false);
      })
      .catch((err) => {
        setErrorMessage("Unexpected error occurred.");
        console.log(err);
      });

    skillService
      .saveSkill(skill)
      .then((response) => {
        //...
        props.onSaved(response.data);
        setShow(false);
        setSubmitted(false);
      })
      .catch((err) => {
        setErrorMessage("Unexpected error occurred.");
        console.log(err);
      });
  };

  const options = [
    { label: 'true', value: true },
    { label: 'false', value: false },
  ];

  //<input name="x" value="y">
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

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
        onSubmit={(e) => saveEmployee(e)}
        noValidate
        className={submitted ? "was-validated" : ""}
      >
        <div className="modal-header">
          <h5 className="modal-title">Employee Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>

        <div className="modal-body">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="form-group">
            <label htmlFor="employeeFirstName">First Name: </label>
            <input
              type="text"
              name="employeeFirstName"
              placeholder="First Name"
              className="form-control"
              value={Employee.employeeFirstName}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">First Name is required.</div>
          </div>

          <div className="form-group">
            <label htmlFor="employeeLastName">Last Name: </label>
            <input
              type="text"
              name="employeeLastName"
              placeholder="Last Name"
              className="form-control"
              value={Employee.employeeLastName}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Last Name is required.</div>
          </div>

          {/*Email Address*/}
          <div className="form-group">
            <label htmlFor="employeeEmailAddress">Email Address: </label>
            <input
              type="email"
              name="employeeEmailAddress"
              placeholder="employeeEmailAddress"
              className="form-control"
              value={Employee.employeeEmailAddress}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Email Address is required</div>
          </div>

          {/*Date Of Birth*/}
          <div className="form-group">
            <label htmlFor="employeeDateOfBirth">Date of Birth: </label>
            <input
              type="text"
              name="employeeDateOfBirth"
              placeholder="YYYY/MM/DD"
              className="form-control"
              value={Employee.employeeDateOfBirth}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Date of Birth is required</div>
          </div>

          {/*Skill Name*/}
          <div className="form-group">
            <label htmlFor="skillName">Skill Name: </label>
            <input
              type="text"
              name="skillName"
              placeholder="skillName"
              className="form-control"
              value={Skill.skillName}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Skill Name is required</div>
          </div>

          {/*Skill Description*/}
          <div className="form-group">
            <label htmlFor="skillDescription">Skill Description: </label>
            <input
              type="text"
              name="skillDescription"
              placeholder="skillDescription"
              className="form-control"
              value={Skill.skillDescription}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">
              Skill Description is required
            </div>
          </div>

          {/* isActive*/}
          {/* <div className="form-group">
            <label htmlFor="isActive">isActive:</label>
            <input
              type="text"
              name="isActive"
              placeholder="isActive"
              className="form-control"
              value={Employee.isActive}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">IsActive is required</div>
          </div> */}

          <div className="form-group ">
            <label htmlFor="select">isActive</label>
            <Select name="select" options={options}></Select>
          </div>

          {/*Age*/}
          <div className="form-group">
            <label htmlFor="employeeAge">Employee Age: </label>
            <input
              type="number"
              name="employeeAge"
              placeholder="employeeAge"
              className="form-control"
              value={Employee.employeeAge}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Employee Age is required</div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
});

export { EmployeeSave };
