import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Cargo las variables de entorno del .env

export class Database {
  private sequelize: Sequelize;

  constructor() {
    const dbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:ftgUQeM2Xxc3@ep-sparkling-water-a57mrpi0.us-east-2.aws.neon.tech/neondb?sslmode=require";
    this.sequelize = new Sequelize(dbUrl);
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Conexión exitosa a la base de datos");

      //Sincronizo las tablas con la base de datos
      await this.sequelize.sync();
      console.log("Tablas sincronizadas exitosamente");
    } catch (err) {
      console.error("Error al conectar a la base de datos:", err);
    }
  }

  getSequelize() {
    return this.sequelize;
  }

  async close() {
    try {
      await this.sequelize.close();
      console.log("Conexión cerrada");
    } catch (err) {
      console.error("Error al cerrar la conexión:", err);
    }
  }
}
