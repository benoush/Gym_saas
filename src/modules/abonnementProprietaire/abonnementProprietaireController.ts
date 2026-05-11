import { AbonnementProprietaireService } from "./abonnementProprietaireService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { AbonnementProprietaireIdAttribute, CreateAbonnementProprietaireAttribute } from "./abonnementProprietaireSchema";

export class AbonnementProprietaireController {
    private abonnementProprietaireService: AbonnementProprietaireService;

    constructor() {
        this.abonnementProprietaireService = new AbonnementProprietaireService();
    }

    createAbonnementProprietaire = async (req: Request, res: Response) => {
        const objectAbonnementProprietaire = req.body;
        const data = await this.abonnementProprietaireService.createAbonnementProprietaire(objectAbonnementProprietaire);
        return sendSuccess(
            res,
            objectAbonnementProprietaire,
            "Operation succesfull"
        )
    }

    getAbonnementProprietaireById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.abonnementProprietaireService.getAbonnementProprietaireById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getAbonnementProprietaireByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const data = await this.abonnementProprietaireService.getAbonnementProprietaireByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getAbonnementProprietairePaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.abonnementProprietaireService.getAbonnementProprietairePaginated(page, limit);
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
        const data = await this.abonnementProprietaireService.updateStatut(id, statut);
        return sendSuccess(res, data, "Statut mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
  };

    updateAbonnementProprietaire = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<AbonnementProprietaireIdAttribute>;
        return res.send({
            data: await this.abonnementProprietaireService.updateAbonnementProprietaire(id, data),
        })
    }

    deleteAbonnementProprietaire = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.abonnementProprietaireService.deleteAbonnementProprietaire(id),
    });
    }

}