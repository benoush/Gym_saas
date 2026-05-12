import { PlanAbonnementProprietaireService } from "./planAbonnementProprietaireService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { PlanAbonnementProprietaireIdAttribute } from "./planAbonnementProprietaireSchema";

export class PlanAbonnementProprietaireController {
    private planAbonnementProprietaireService: PlanAbonnementProprietaireService;

    constructor() {
        this.planAbonnementProprietaireService = new PlanAbonnementProprietaireService();
    }

    createPlanAbonnementProprietaire = async (req: Request, res: Response) => {
        const objectPlanAbonnementProprietaire = req.body;
        const data = await this.planAbonnementProprietaireService.createPlanAbonnementProprietaire(objectPlanAbonnementProprietaire);
        return sendSuccess(
            res,
            objectPlanAbonnementProprietaire,
            "Operation succesfull"
        )
    }

    getPlanAbonnementProprietaireById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.planAbonnementProprietaireService.getPlanAbonnementProprietaireById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getPlanAbonnementProprietairePaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.planAbonnementProprietaireService.getPlanAbonnementProprietairePaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

      updateType = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id as string;
        const { type } = req.body;
        const data = await this.planAbonnementProprietaireService.updateType(id, type);
        return sendSuccess(res, data, "Type mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
  };

    updatePlanAbonnementProprietaire = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<PlanAbonnementProprietaireIdAttribute>;
        return res.send({
            data: await this.planAbonnementProprietaireService.updatePlanAbonnementProprietaire(id, data),
        })
    }

    deletePlanAbonnementProprietaire = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.planAbonnementProprietaireService.deletePlanAbonnementProprietaire(id),
    });
    }

}