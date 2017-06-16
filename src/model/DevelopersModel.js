import Sequelize from "sequelize";

import sequelize from "../sequelize";

const DevelopersModel = sequelize.define("developers", {
  name: {
    type: Sequelize.STRING
  },
  rate: {
    type: Sequelize.FLOAT
  }
});

DevelopersModel.sync({force: true}).then(() => {
  DevelopersModel.count().then(count => {
    if (count === 0) {
      DevelopersModel.create({
        name: "Mobile Android Dev",
        rate: 5
      });

      DevelopersModel.create({
        name: "Mobile IOS Dev",
        rate: 4
      });

      DevelopersModel.create({
        name: "Vue Client Dev",
        rate: 6
      });
    }
  });
});

export default DevelopersModel;
