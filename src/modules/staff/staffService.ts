
import { UserService } from "modules/user/userService";
import { StaffCreationAttributes } from "../../database/models/staff";
import { StaffRepository } from "./staffRepository";
import { CreateStaffAttribute } from "./staffSchema";
import { RoleEnum } from "enum/roleEnum";
import { BadRequestError } from "common/errors";


export class StaffService {
    private staffRepository: StaffRepository;
    private userService: UserService;

    constructor() {
        this.staffRepository = new StaffRepository();
        this.userService = new UserService();
    }
    async createStaff(StaffRequest: CreateStaffAttribute) {

        const user = await this.userService.createuser({
            nom: StaffRequest.nom,
            prenom: StaffRequest.prenom,
            email: StaffRequest.email,
            tel: StaffRequest.tel,
            sexe: StaffRequest.sexe,
            password: StaffRequest.password,
            role: RoleEnum.STAFF,
            photo: StaffRequest.photo,
        });

        if (!user) {
            throw new BadRequestError("Failed to create user for staff");
        }


        return await this.staffRepository.createStaff({
            userId: user.id,
            salleId: StaffRequest.salleId,
        });
    }
    async getStaffById(id: string) {
        return await this.staffRepository.getStaffById(id);
    }
    async getStaffByEmail(email: string) {
        return await this.staffRepository.getStaffByEmail(email);
    }
    async getStaffPaginated(page: number, limit: number) {
        return await this.staffRepository.getStaffPaginated(page, limit);
    }
    async updateStaff(id: string, updatedData: Partial<StaffCreationAttributes>) {
        const data = await this.staffRepository.getStaffById(id);
        if (!data) {
            return null;
        }
        return await this.staffRepository.updateStaff(id, updatedData);
    }
    async deleteStaff(id: string) {
        return await this.staffRepository.deleteStaff(id);
    }
}