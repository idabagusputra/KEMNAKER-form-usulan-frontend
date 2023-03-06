import { Sequelize } from "sequelize";

const db = new Sequelize("form_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;