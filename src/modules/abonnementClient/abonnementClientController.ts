import { AbonnementClientService } from "./abonnementClientService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { AbonnementClientIdAttribute, CreateAbonnementClientAttribute } from "./abonnementClientSchema";

export class AbonnementClientController {
    private abonnementClientService: AbonnementClientService;

    constructor() {
        this.abonnementClientService = new AbonnementClientService();
    }

    createAbonnementClient = async (req: Request, res: Response) => {
        const objectAbonnementClient = req.body;
        const data = await this.abonnementClientService.createAbonnementClient(objectAbonnementClient);
        return sendSuccess(
            res,
            data,
            "Operation succesfull"
        )
    }

    getAbonnementClientById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.abonnementClientService.getAbonnementClientById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getAbonnementClientByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const data = await this.abonnementClientService.getAbonnementClientByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getAbonnementClientPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.abonnementClientService.getAbonnementClientPaginated(page, limit);
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
        const data = await this.abonnementClientService.updateStatut(id, statut);
        return sendSuccess(res, data, "Statut mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
  };

    updateAbonnementClient = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<AbonnementClientIdAttribute>;
        return res.send({
            data: await this.abonnementClientService.updateAbonnementClient(id, data),
        })
    }

    deleteAbonnementClient = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.abonnementClientService.deleteAbonnementClient(id),
    });
    }

}