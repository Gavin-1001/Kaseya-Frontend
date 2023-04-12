import React, { useState, useEffect } from "react";
import employeeService from "../../service/employeeService";

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);

  //implment a mounted method, which is a callback method that is invoked immediately after the
  //explaination lecture 77 1:15

  useEffect(() => {
    employeeService.getAllEmployees().then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });
  }, []);
  //CHECK SENOL's CODE FOR THE CORS ISSUE IT COULD BE A BACKEND ISSUE.

  return (
    <div>
      <div className="container">
        <div className="pt-5">
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
                        {/* <button className="btn btn-primary me-1" onClick={() => editEmployeeRequest(item)}> */}
                        <button className="btn btn-primary me-1">
                            Edit
                        </button>
                        {/* <button className="btn btn-danger" onClick={() => deleteEmployeeRequest(item)}> */}
                        <button className="btn btn-danger">
                            Delete
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
    </div>
  );
};

export default Dashboard;
