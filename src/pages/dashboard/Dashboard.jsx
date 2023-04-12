import React, { useState, useEffect, useRef } from "react";
import employeeService from "../../service/employeeService";
import Employee from "./../../common/models/Employee";
import employee from "./../../common/models/Employee";
import { EmployeeDelete } from "../../components/modals/EmployeeDelete";

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeSelect, setEmployeeSelect] = useState(new Employee());
  const [errorMessage, setErrorMessage] = useState('');

  const deleteEmployeeComponent = useRef();
  

  //implment a mounted method, which is a callback method that is invoked immediately after the
  //explaination lecture 77 1:15

  useEffect(() => {
    employeeService.getAllEmployees().then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });
  }, []);

  const deleteEmployeeRequest= (employee) => {
    setEmployeeSelect(employee);
    deleteEmployeeComponent.current?.showDeleteModal();
  };



  const deleteEmployee = () => {
    employeeService.deleteEmployee(employeeSelect).then(_=>{
        setEmployeeList(employeeList.filter(x => x.id !== employeeSelect.id));
    }).catch(err => {
        setErrorMessage("Unexpected Error");
        console.log(err);
    })
  }

  return (
    <div>
      <div className="container">
        <div className="pt-5">
            {errorMessage && 
                <div className="alert alert-danger">{errorMessage}</div>
            }
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <h3>All Employees</h3>
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
                    <th scope="col">Skill Level</th>
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
                      <td>{item.employeeDateOfBirth}</td>
                      <td>{item.employeeEmailAddress}</td>
                      <td>{item.employeeSkillLevel}</td>
                      <td>{item.isActive.toString()}</td>
                      <td>{item.employeeAge}</td>
                      <td>
                        <button className="btn btn-primary me-2">EDIT</button>
                        <button className="btn btn-danger" onClick={() => deleteEmployeeRequest(item)}>DELETE</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EmployeeDelete ref={deleteEmployeeComponent} onConfirmed={() => deleteEmployee()} />
    </div>
  );
};

export default Dashboard;
