import React, { useState, useEffect, useRef } from "react";
import employeeService from "../../service/employeeService";
import { Link } from "react-router-dom";
import Employee from "./../../common/models/Employee";

import { EmployeeDelete } from "../../components/modals/EmployeeDelete";
import { EmployeeSave } from "../../components/modals/EmployeeSave";
import skillService from "../../service/skillService";

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [employeeSelect, setEmployeeSelect] = useState(new Employee());
  const [errorMessage, setErrorMessage] = useState("");

  const deleteEmployeeComponent = useRef();
  const addEmployeeComponent = useRef();

  useEffect(() => {
    employeeService.getAllEmployees().then((response) => {
      setEmployeeList(response.data);
    });
  }, []);

  useEffect(() => {
    skillService.getAllSkills().then((response) => {
      setSkillList(response.data);
    });
  }, []);

  // useEffect(() => {
  //     employeeService.getAllEmployees().then((response) => {
  //         setEmployeeList(response.data);
  //     });
  // }, []);

  const deleteEmployeeRequest = (employee) => {
    setEmployeeSelect(employee);
    deleteEmployeeComponent.current?.showDeleteModal();
  };

  const createEmployeeRequest = () => {
    setEmployeeSelect(new Employee("", "", "", "", "", "", "", ""));
    addEmployeeComponent.current?.showEmployeeModal();
  };

  const deleteEmployee = () => {
    employeeService
      .deleteEmployee(employeeSelect)
      .then((_) => {
        setEmployeeList(employeeList.filter((x) => x.id !== employeeSelect.id));
      })
      .catch((err) => {
        setErrorMessage("Unexpected Error");
        console.log(err);
      });
  };

  const updateEmployeeRequest = (item) => {
    setEmployeeSelect(Object.assign({}, item));
    addEmployeeComponent.current?.showEmployeeModal();
  };

  const watchSaveEmployee = (employee) => {
    let itemIndex = employeeList.findIndex((item) => item.id === employee.id);

    if (itemIndex !== -1) {
      const newList = employeeList.map((item) => {
        if (item.id === employee.id) {
          return employee;
        }
        return item;
      });
      setEmployeeList(newList);
    } else {
      const newList = employeeList.concat(employee);
      setEmployeeList(newList);
    }
  };

  return (
    // ***** MAYBE ADD MATERIALS UI FOR TABLE AT THE END *****
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
                  <h3>All Employees</h3>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => createEmployeeRequest()}
                  >
                    Add Employee!
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Date Of Birth</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Skill</th>
                    <th scope="col">Active</th>
                    <th scope="col">Age</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeList.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.employeeFirstName}</td>
                      <td>{item.employeeLastName}</td>
                      <td>
                        {new Date(
                          item.employeeDateOfBirth
                        ).toLocaleDateString()}
                      </td>
                      <td>{item.employeeEmailAddress}</td>
                      <td>
                        <Link
                          to="/skills"
                          className="btn btn-link"
                          style={{ color: "darkgray" }}
                        >
                          Skills
                        </Link>
                        {/*THERE IS AN ERROR ON THE LINK. HAVE THE SKILLS
                           DISPLAYED ON THE SKILLS PAGE*/}
                      </td>

                      <td>{item.employeeSkillLevel}</td>
                      <td>{item.isActive.toString()}</td>
                      <td>{item.employeeAge}</td>
                      <td className="button-container">
                        <button
                          className="btn btn-primary me-1"
                          onClick={() => updateEmployeeRequest(item)}
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteEmployeeRequest(item)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EmployeeSave
        ref={addEmployeeComponent}
        employee={employeeSelect}
        onSaved={(e) => watchSaveEmployee(e)}
      />
      <EmployeeDelete
        ref={deleteEmployeeComponent}
        onConfirmed={() => deleteEmployee()}
      />
    </div>
  );
};

export default Dashboard;
