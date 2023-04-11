import React, { useState, useEffect } from "react";
import employeeService from "../../service/employeeService";

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);

  //implment a mounted method, which is a callback method that is invoked immediately after the
  //explaination lecture 77 1:15

  useEffect(() => {
    employeeService.getAllEmployees().then((response) => {
        setEmployeeList(response.data);
    });
}, []);

  return( 
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
              <table className="table table-striped"></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
