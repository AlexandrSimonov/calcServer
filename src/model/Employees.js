import SHA256 from "crypto-js/sha256";

import EmployeeModel from "./EmployeeModel";
import Employee from "./Employee";
import app from "../app";

/*
  Нужно создавать сотрудников
  Редактировать сотрудников
  Сотрудники которые в системе и которые могут получать данные 
*/

export default new class Employees {
  constructor() {
    this.employees = [];

    app.post("/api/employee/auth", (req, res) => {
      console.log(req.body);

      EmployeeModel.findOne({
        where: {
          email: req.body.email,
          password: SHA256(req.body.password).toString()
        }
      }).then(user => {
        if (user !== null) {
          const token = SHA256(
            user.password + new Date().getTime() + Math.floor(Math.random() * 1000)
          ).toString();
          this.employees.push(
            new Employee(
              {
                id: user.id,
                name: user.name,
                role: user.role,
                linkActivate: user.linkActivate
              },
              token
            )
          );

          res.json({access_token: token});
        } else {
          res.json({error: "Не верный логин или пароль"});
        }
      });
    });

    app.post("/api/employee/reg", (req, res) => {
      const user = this.findEmployeeByToken(req.body.access_token);

      user.getRole().then(role => {
        if (role === "admin") {
          const link = user.password + new Date().getTime() + Math.floor(Math.random() * 1000);

          EmployeeModel.create({
            email: req.body.email,
            name: req.body.name,
            role: req.body.role,
            password: "",
            linkActivate: link
          }).then(() => {
            /* Email.send(
              `
              Вы добавлены в систему Simporok Cherry.
              Это ваше персональное приглашение
              Чтобы активировать аккаунт нужно перейти по <a href="${link}">ссылке</a>            
              `
            );*/

            res.send("Всё прошло збс");
          });
        }
      });
    });
  }

  findEmployeeByToken(token) {
    return this.employees.find(el => el.token === token);
  }
}();
