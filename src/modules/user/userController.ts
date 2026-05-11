import { UserService } from "./userService";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { CreateUserAttribute } from "./userSchema";
import { UserCreationAttributes } from "../../database/models/user";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createuser = async (req: Request, res: Response) => {
        const file = req.file;
        const photo = file ? file.path.replace(/\\/g, "/") : null;
        const data = await this.userService.createuser({
            ...req.body,
            photo,
        });
        return sendSuccess(res, data, "Operation successful", 201);
    };

    getuserById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.userService.getuserById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getuserByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const data = await this.userService.getuserByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getuserPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.userService.getuserPaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateuser = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const file = req.file;
        const updateData: Partial<UserCreationAttributes> = { ...req.body };
            if (file) updateData.photo = file.path.replace(/\\/g, "/");
            return res.send({
                data: await this.userService.updateuser(id, updateData),
            });
    };

    deleteuser = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        return res.send({
            data: await this.userService.deleteuser(id),
        });
    }

}