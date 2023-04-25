export default class Employee{
    constructor (id, employeeFirstName, employeeLastName, employeeEmailAddress, employeeDateOfBirth, isActive, employeeAge){// Skill, skillName, skillDescription
        this.id = id;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.employeeEmailAddress = employeeEmailAddress;
        this.employeeDateOfBirth = employeeDateOfBirth;

        this.isActive = isActive;
        this.employeeAge = employeeAge;
    }
}