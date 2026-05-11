import { ClientService } from "./clientService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { ClientIdAttribute, CreateClientAttribute } from "./clientSchema";

export class ClientController {
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    createClient = async (req: Request, res: Response) => {
        const objectClient = req.body;
        const data = await this.clientService.createClient(objectClient);
        return sendSuccess(
            res,
            objectClient,
            "Operation succesfull"
        )
    }

    getClientById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.clientService.getClientById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getClientByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const data = await this.clientService.getClientByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getClientPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.clientService.getClientPaginated(page, limit);
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
        const data = await this.clientService.updateStatut(id, statut);
        return sendSuccess(res, data, "Statut mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
  };

    updateClient = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<ClientIdAttribute>;
        return res.send({
            data: await this.clientService.updateClient(id, data),
        })
    }

    deleteClient = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.clientService.deleteClient(id),
    });
    }

}