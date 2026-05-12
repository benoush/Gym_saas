import { PlanAbonnementClientService } from "./planAbonnementClientService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { PlanAbonnementClientIdAttribute } from "./planAbonnementClientSchema";

export class PlanAbonnementClientController {
    private planAbonnementClientService: PlanAbonnementClientService;

    constructor() {
        this.planAbonnementClientService = new PlanAbonnementClientService();
    }

    createPlanAbonnementClient = async (req: Request, res: Response) => {
        const objectPlanAbonnementClient = req.body;
        const data = await this.planAbonnementClientService.createPlanAbonnementClient(objectPlanAbonnementClient);
        return sendSuccess(
            res,
            objectPlanAbonnementClient,
            "Operation succesfull"
        )
    }

    getPlanAbonnementClientById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.planAbonnementClientService.getPlanAbonnementClientById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getPlanAbonnementClientPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.planAbonnementClientService.getPlanAbonnementClientPaginated(page, limit);
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
        const data = await this.planAbonnementClientService.updateType(id, type);
        return sendSuccess(res, data, "Type mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
  };

    updatePlanAbonnementClient = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<PlanAbonnementClientIdAttribute>;
        return res.send({
            data: await this.planAbonnementClientService.updatePlanAbonnementClient(id, data),
        })
    }

    deletePlanAbonnementClient = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.planAbonnementClientService.deletePlanAbonnementClient(id),
    });
    }

}