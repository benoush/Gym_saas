import { PaiementService } from "./paiementService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { PaiementIdAttribute, CreatePaiementAttribute } from "./paiementSchema";

export class PaiementController {
    private paiementService: PaiementService;

    constructor() {
        this.paiementService = new PaiementService();
    }

    createPaiement = async (req: Request, res: Response) => {
        const objectPaiement = req.body;
        const data = await this.paiementService.createPaiement(objectPaiement);
        return sendSuccess(
            res,
            objectPaiement,
            "Operation succesfull"
        )
    }

    getPaiementById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.paiementService.getPaiementById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getPaiementPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.paiementService.getPaiementPaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

      updateStatut = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id as string;
        const { statut } = req.body;
        const data = await this.paiementService.updateStatut(id, statut);
        return sendSuccess(res, data, "Statut mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
    };

    updateMethode = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id as string;
        const { methode } = req.body;
        const data = await this.paiementService.updateMethode(id, methode);
        return sendSuccess(res, data, "Méthode de paiement mise à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
    }

    updatePaiement = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<PaiementIdAttribute>;
        return res.send({
            data: await this.paiementService.updatePaiement(id, data),
        })
    }

    deletePaiement = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.paiementService.deletePaiement(id),
    });
    }

}