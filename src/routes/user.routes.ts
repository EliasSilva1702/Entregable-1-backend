import { Router, Request, Response } from "express";
import { User } from "../models/user.model";

export class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllUsers);
    this.router.post("/", this.createUser);
  }

  private async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
  }

  private async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      // Validar datos requeridos
      if (!name || !email) {
        return res
          .status(400)
          .json({ message: "El nombre y el correo son obligatorios." });
      }

      // Crear el usuario en la base de datos
      const user = await User.create({ name, email });

      // Enviar respuesta con el usuario creado
      res.status(201).json(user);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ message: "Error al crear el usuario", error });
    }
  }
}
