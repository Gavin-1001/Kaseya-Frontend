import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import Employee from "../../common/models/Employee";
import employeeService from "../../service/employeeService";
import { Modal } from "react-bootstrap";

const EmployeeSave = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    //interaction with parent
    showProductModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  useEffect(() => {
    setEmployee(props.employee);
  }, [props.employee]);

  const [employee, setEmployee] = useState(
    new Employee("", "", "", "", "", "", "")
  ); //maybe add another , '' for the id if it breaks
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const saveEmployee = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !employee.employeeFirstName ||
      !employee.employeeLastName ||
      !employee.employeeEmailAddress ||
      !employee.employeeDateOfBirth ||
      !employee.employeeSkillsLevel ||
      !employee.isActive ||
      !employee.employeeAge
    ) {
      employeeService
        .saveEmployee(employee)
        .then((response) => {
          props.onSaved(response.data);
          setShow(false);
          setSubmitted(false);
        })
        .catch((err) => {
          setErrorMessage("THere was an unexpected error");
          console.log(err);
        });
    }

    const handleChange = (e) => {
      const { name, value } = e.target;

      setEmployee((previousState) => {
        return {
          ...previousState,
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
            <h4 className="modal-title">Edit Employee Details</h4>
            <button
              className="bt-close"
              onClick={() => setShow(false)}
            ></button>
          </div>
          <div classNam="modal-body">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
        {/*employeeFirstName*/}
            <div className="form-group">
              <label htmlFor="employeeFirstName">Employee First Name</label>
              <input
                type="text"
                name="employeeFirstName"
                placeholder="First Name"
                className="form-control"
                value={employee.employeeFirstName}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                    Employee First Name is required!!
              </div>
            </div>
        {/*employeeLastName*/}
            <div className="form-group">
              <label htmlFor="employeeEmailAddress">Employee Email Address</label>
              <input
                type="text"
                name="employeeEmailAddress"
                placeholder="Email Address"
                className="form-control"
                value={employee.employeeEmailAddress}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                    Employee Email Address is required!!
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employeeDateOfBirth">Employee First Name</label>
              <input
                type="text"
                name="employeeDateOfBirth"
                placeholder="Date of Birth"
                className="form-control"
                value={employee.employeeDateOfBirth}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                    Employee Date of Birth is required!!
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employeeSkillLevel">Employee Skill Level</label>
              <input
                type="text"
                name="employeeSkillLevel"
                placeholder="Skill Level"
                className="form-control"
                value={employee.employeeSkillLevel}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                    Employee Skill Level is required!!
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="isActive">Employee Status</label>
              <input
                type="text"
                name="isActive"
                placeholder="True/False"
                className="form-control"
                value={employee.isActive}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                    Employee Status is required!!
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employeeAge">Employee Age</label>
              <input
                type="text"
                name="employeeAge"
                placeholder="Age"
                className="form-control"
                value={employee.employeeAge}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                    Employee Age is required!!
              </div>
            </div>



          </div>
        </form>
      </Modal>
    );
  };
});
export default EmployeeSave;
