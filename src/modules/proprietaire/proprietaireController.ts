import { ProprietaireService } from "./proprietaireService";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { CreateProprietaireAttribute } from "./proprietaireSchema";
import { ProprietaireCreationAttributes } from "../../database/models/proprietaire";
import { AuthRequest } from "../../common/auth/auth.types";
export class ProprietaireController {
    private proprietaireService: ProprietaireService;

    constructor() {
        this.proprietaireService = new ProprietaireService();
    }

    createProprietaire = async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if (!files) {
            return res.status(400).json({ success: false, message: "Aucun fichier envoyé" });
        }
    const photoFile = files["photo"]?.[0];    
    const photo = photoFile ? photoFile.path.replace(/\\/g, "/") : null;    
    const recto = files["recto_carte_identite"]?.[0]?.path.replace(/\\/g, "/");
    const verso = files["verso_carte_identite"]?.[0]?.path.replace(/\\/g, "/");
    const doc = files["doc_justificatif"]?.[0]?.path.replace(/\\/g, "/");

    if ( !recto || !verso || !doc || !photo) {
      return res.status(400).json({ success: false, message: "Les 4 documents sont requis" });
    }

        const data = await this.proprietaireService.createProprietaire( {
            ...req.body,
            photo,
            recto_carte_identite: recto,
            verso_carte_identite: verso,
            doc_justificatif: doc,
        } as CreateProprietaireAttribute);
        return sendSuccess(
            res,
            data,
            "Operation succesfull"
        )
  };

    getProprietaireById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.proprietaireService.getProprietaireById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getProprietaireByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const data = await this.proprietaireService.getProprietaireByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getProprietairePaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.proprietaireService.getProprietairePaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateProprietaire = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const data: Partial<ProprietaireCreationAttributes> = {};

    if (files?.["recto_carte_identite"]?.[0]) data.recto_carte_identite = files["recto_carte_identite"][0].path.replace(/\\/g, "/");
    if (files?.["verso_carte_identite"]?.[0]) data.verso_carte_identite = files["verso_carte_identite"][0].path.replace(/\\/g, "/");
    if (files?.["doc_justificatif"]?.[0]) data.doc_justificatif = files["doc_justificatif"][0].path.replace(/\\/g, "/");

    return res.send({
      data: await this.proprietaireService.updateProprietaire(id, data),
    });
  };

    deleteProprietaire = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        return res.send({
            data: await this.proprietaireService.deleteProprietaire(id),
        });
    }

}