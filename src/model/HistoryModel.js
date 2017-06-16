import Sequelize from "sequelize";

import sequelize from "../sequelize";

const HistoryModel = sequelize.define("history", {
  developers: {
    type: Sequelize.JSON
  },
  coefs: {
    type: Sequelize.JSON
  },
  result: {
    type: Sequelize.FLOAT
  },
  id_employee: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE
  }
});
HistoryModel.sync({force: true}).then(() => {
  HistoryModel.count().then(count => {
    if (count === 0) {
      HistoryModel.create({
        id_employee: 1,
        date: new Date(),
        result: 200,
        developers: [{name: "IOS DEV", hours: 1.5, coef: 1}],
        coefs: [
          {
            name: "a",
            value: 0.554
          },
          {
            name: "b",
            value: 2
          },
          {
            name: "c",
            value: 3
          },
          {
            name: "d",
            value: 9
          }
        ]
      });
    }
  });
});

export default HistoryModel;
