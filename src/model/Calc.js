import fs from "fs";
import path from "path";
import app from "../app";
import Developers from "./DevelopersModel";
import Employees from "./Employees";
import CoefsModel from "./CoefsModel";
import HistoryModel from "./HistoryModel";

export default new class Calc {
  constructor() {
    app.get("/api/dev_list", (req, res) => {
      const employee = Employees.findEmployeeByToken(req.query.access_token);

      if (employee) {
        Developers.findAll({attributes: ["name", "rate"]}).then(developers => {
          res.json(developers);
        });
      }
    });

    app.get("/api/formula", (req, res) => {
      const employee = Employees.findEmployeeByToken(req.query.access_token);

      if (employee) {
        CoefsModel.findAll({attributes: ["name", "value", "type", "role"]}).then(coefs => {
          const objRes = {coefs: [], formula: ""};

          coefs.forEach(el => {
            if (el.role === "all" || el.role === employee.getRole()) {
              objRes.coefs.push({type: el.type, name: el.name, value: el.value});
            }
          });
          try {
            fs.readFile(path.join(__dirname, "formula.tg"), (err, data) => {
              objRes.formula = data.toString();
              res.json(objRes);
            });
          } catch (e) {
            console.log(e);
          }
        });
      }
    });

    app.get("/api/get_history", (req, res) => {
      HistoryModel.findAll().then(history => {
        res.json(history);
      });
    });

    app.post("/api/add_history", (req, res) => {
      const employee = Employees.findEmployeeByToken(req.body.access_token);

      if (employee) {
        HistoryModel.create({
          id_employee: employee.id,
          date: new Date(),
          result: req.body.result,
          developers: req.body.developers,
          coefs: req.body.coefs
        })
          .then(() => {
            res.send("Ok");
          })
          .catch(err => {
            res.send(err);
          });
      }
    });

    app.post("/api/add_coef", (req, res) => {
      const employeeRole = Employees.findEmployeeByToken(req.body.access_token).getRole();

      if (employeeRole === "admin") {
        CoefsModel.create({
          value: req.body.value,
          name: req.body.name,
          type: req.body.type,
          role: req.body.role
        })
          .then(() => {
            res.send("Ok");
          })
          .catch(err => {
            res.send(err);
          });
      }
    });

    app.post("/api/set_coef", (req, res) => {
      const employeeRole = Employees.findEmployeeByToken(req.body.access_token).getRole();

      if (employeeRole === "admin") {
        CoefsModel.update(
          {value: req.body.value, type: req.body.type, role: req.body.role},
          {where: {name: req.body.name}}
        )
          .then(() => {
            res.send("Ok");
          })
          .catch(err => {
            res.send(err);
          });
      }
    });

    app.post("/api/set_formula", (req, res) => {
      const employeeRole = Employees.findEmployeeByToken(req.body.access_token).getRole();

      if (employeeRole === "admin") {
        fs
          .writeFile(path.join(__dirname, "formula.tg"), res.body.formula)
          .then(() => {
            res.send("Ok");
          })
          .catch(err => {
            res.send(err);
          });
      }
    });
  }
}();
