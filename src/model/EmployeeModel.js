import Sequelize from "sequelize";
import SHA256 from "crypto-js/sha256";

import sequelize from "../sequelize";

const EmployeeModel = sequelize.define(
  "employees",
  {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    linkActivate: {
      type: Sequelize.STRING
    }
  },
  {underscored: true}
);

EmployeeModel.sync({force: true}).then(() => {
  EmployeeModel.count().then(count => {
    if (count === 0) {
      EmployeeModel.create({
        email: "a@a.a",
        name: "Симонов Сашка",
        password: SHA256(`a`).toString(),
        role: "admin"
      });
    }
  });
});

export default EmployeeModel;
