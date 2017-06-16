import Sequelize from "sequelize";

import sequelize from "../sequelize";

const CoefsModel = sequelize.define("coefs", {
  name: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.FLOAT
  },
  type: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  }
});

CoefsModel.sync({force: true}).then(() => {
  CoefsModel.count().then(count => {
    if (count === 0) {
      CoefsModel.create({
        name: "a",
        value: 0.554,
        type: "float",
        role: "all"
      });

      CoefsModel.create({
        name: "b",
        value: 0.2,
        type: "float",
        role: "all"
      });

      CoefsModel.create({
        name: "c",
        value: 1,
        type: "integer",
        role: "all"
      });

      CoefsModel.create({
        name: "d",
        value: 3,
        type: "integer",
        role: "all"
      });
    }
  });
});

export default CoefsModel;
