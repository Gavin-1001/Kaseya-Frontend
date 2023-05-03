import React, { useState, useEffect, useRef } from "react";
import employeeService from "../../service/employeeService";
import Employee from "./../../common/models/Employee";

import { EmployeeDelete } from "../../components/modals/EmployeeDelete";
import { EmployeeSave } from "../../components/modals/EmployeeSave";
import skillService from "../../service/skillService";
import Skill from "../../common/models/Skill";
import AddSkill from "../../components/modals/AddSkill/AddSkill";

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [employeeSelect, setEmployeeSelect] = useState(new Employee());
  const [skillSelect, setSkillSelect] = useState(new Skill());
  const [errorMessage, setErrorMessage] = useState("");

  const deleteEmployeeComponent = useRef();
  const addEmployeeComponent = useRef();
  const addSkillComponent = useRef();

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


  const deleteEmployeeRequest = (employee) => {
    setEmployeeSelect(employee);
    console.log(employeeSelect); // this is where the id is printed to the console
    deleteEmployeeComponent.current?.showDeleteModal();
  };

  const createEmployeeRequest = () => {
    setEmployeeSelect(new Employee("", "", "", "", "", "", "", ""));
    addEmployeeComponent.current?.showEmployeeModal();
  };

  const addSkillRequest = () => {
    setSkillSelect(new Skill("","",""));
    addSkillComponent.current?.showAddSkillModal();
  }


  const deleteEmployee = () => {
    employeeService
      .deleteEmployee(employeeSelect)
      .then((_) => {
        setEmployeeList(employeeList.filter((x) => x.id !== employeeSelect.id));
        console.log("ASKDJHSAD "+employeeSelect.id); //id shows here
      })
      .catch((err) => {
        setErrorMessage("Unexpected Error");
        console.log(err);
      });
  };

  const goToSkill = () => {
  // setEmployeeSelect();
  // console.log(employeeSelect);
  // console.log(employeeList.filter((x) => x.id !== employeeSelect.id));
  // skillService.saveSkill(skillSelect)
    ////////////////

    skillService.saveSkill(skillSelect).then((_) =>{
      setSkillSelect(skillList.filter((x) => x.id !== skillSelect.id));
      console.log(employeeSelect.id);
      console.log("TEST")
    }).catch((err) =>{
      setErrorMessage("THERE WAS AN ERROR")
      console.log(err);
    })

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
                      <td className="button-container">
                        <button
                          className="btn btn-info"
                          // onClick={() => goToSkill()}
                          onClick={() => addSkillRequest(item)}
                        >
                          Create Skill
                        </button>
                      </td>

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
      <AddSkill 
        ref={addSkillComponent}
        onConfirmed={() => goToSkill()} />
    </div>
  );
};

export default Dashboard;
