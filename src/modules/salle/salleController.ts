import { SalleService } from "./salleService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { UpdatesalleAttribute } from "./salleSchema";

export class SalleController {
    private salleService: SalleService;

    constructor() {
        this.salleService = new SalleService();
    }

    createSalle = async (req: Request, res: Response) => {
        const objectSalle = req.body;
        const data = await this.salleService.createSalle(objectSalle);
        return sendSuccess(
            res,
            data,
            "Operation succesfull",
            201
        )
    }

    getSalleById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.salleService.getSalleById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getSallePaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.salleService.getSallePaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateSalle = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<UpdatesalleAttribute>;
        return res.send({
            data: await this.salleService.updateSalle(id, data),
        })
    }

    deleteSalle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        await this.salleService.deleteSalle(id);
        return sendSuccess(res, null, "Salle deleted successfully", 200);
    } catch (error) {
        next(error);
    }
}

}