import Skill from "./Skill";
export default class Employee{
    constructor (id, employeeFirstName, employeeLastName, employeeEmailAddress, employeeDateOfBirth, isActive, employeeAge, props){// Skill, skillName, skillDescription
        this.id = id;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.employeeEmailAddress = employeeEmailAddress;
        this.employeeDateOfBirth = employeeDateOfBirth;
        // this.Skill = Skill;
        // this.skillName = this.skillName;
        // this.skillDescription = skillDescription;
        this.isActive = isActive;
        this.employeeAge = employeeAge;
    }
}