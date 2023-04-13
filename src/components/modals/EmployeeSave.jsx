import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import Employee from "../../common/models/Employee";
import employeeService from "../../service/employeeService";

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
  const [errorMessage, setErrorMessage] = useState('');

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
        employeeService.saveEmployee(employee).then(response => {
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);
        }).catch(err => {
            setErrorMessage("THere was an unexpected error")
            console.log(err);
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setEmployee((previousState =>{
            return {
                ...previousState,
                [name]:value
            }
        }))
    }
  };

  return <div></div>;
});

export default EmployeeSave;
