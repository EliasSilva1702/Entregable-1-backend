import { Router, Request, Response } from "express";
import { Repair } from "../models/repair.model";

export class RepairRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllRepairs);
    this.router.post("/", this.createRepair);
  }

  private async getAllRepairs(req: Request, res: Response) {
    try {
      const repairs = await Repair.findAll();
      res.json(repairs);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las reparaciones", error });
    }
  }

  private async createRepair(req: Request, res: Response) {
    try {
      const { description, status, userId } = req.body;
      const repair = await Repair.create({ description, status, userId });
      res.status(201).json(repair);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la reparación", error });
    }
  }
}
