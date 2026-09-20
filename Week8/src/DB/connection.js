import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("DevPulse", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: (...msg) => console.log(`[Sequelize] ${msg}`),
});

export default function connectToDatabase() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

// export default function connectToDatabase() {
//   sequelize
//     .sync({ alter: false, force: true })
//     .then(() => {
//       console.log("Database Connection has been established successfully.");
//     })
//     .catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     });
// }
