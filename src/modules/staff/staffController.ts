import { StaffService } from "./staffService";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { CreateStaffAttribute } from "./staffSchema";

export class StaffController {
    private staffService: StaffService;

    constructor() {
        this.staffService = new StaffService();
    }

    createStaff = async (req: Request, res: Response) => {
        const objectStaff = req.body;
        const data = await this.staffService.createStaff(objectStaff);
        return sendSuccess(
            res,
            objectStaff,
            "Operation succesfull"
        )
    }

    getStaffById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.staffService.getStaffById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getStaffByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const data = await this.staffService.getStaffByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getStaffPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.staffService.getStaffPaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateStaff = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<CreateStaffAttribute>;
        return res.send({
            data: await this.staffService.updateStaff(id, data),
        })
    }

    deleteStaff = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.staffService.deleteStaff(id),
    });
    }

}