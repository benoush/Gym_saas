import { FactureService } from "./factureService";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { CreateFactureAttribute } from "./factureSchema";
import { TypeFacture } from "../../enum/typeFacture";

export class FactureController {
    private factureService: FactureService;

    constructor() {
        this.factureService = new FactureService();
    }

    createFacture = async (req: Request, res: Response) => {
        const objectFacture = req.body;
        const data = await this.factureService.createFacture(objectFacture);
        return sendSuccess(
            res,
            objectFacture,
            "Operation succesfull"
        )
    }

    getFactureById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.factureService.getFactureById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getFacturePaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const typeFacture = req.query.typeFacture as TypeFacture | undefined;
        const data = await this.factureService.getFacturePaginated({
            page,
            limit,
            typeFacture,
        });
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateFacture = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<CreateFactureAttribute>;
        return res.send({
            data: await this.factureService.updateFacture(id, data),
        })
    }

    deleteFacture = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.factureService.deleteFacture(id),
    });
    }

}