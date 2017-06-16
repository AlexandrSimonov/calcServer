import EmployeeModel from "./EmployeeModel";

export default class Employee {
  constructor(user, token) {
    this.token = token;
    this.id = user.id;
    this.name = user.name;
    this.role = user.role;
    this.linkActivate = user.linkActivate;
  }

  isValid() {
    if (this.linkActivate !== null) return false;
    if (
      this.id === undefined ||
      this.role === undefined ||
      this.name === undefined ||
      this.token === undefined
    )
      return false;
    return true;
  }

  getRole() {
    if (this.isValid()) {
      return this.role;
    }
    return new Error("Не валидный");
  }

  setRole(role) {
    if (this.isValid()) {
      return EmployeeModel.update({where: {id: this.id}, values: {role}});
    }
    return new Error("Не валидный");
  }
}
