import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
dotenv.config()

// Vence el 01-julio-2024
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + "/../models/**/*"],
    logging: false
})

export default db