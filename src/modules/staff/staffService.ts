
import { StaffCreationAttributes } from "../../database/models/staff";
import { StaffRepository } from "./staffRepository";
import { CreateStaffAttribute } from "./staffSchema";


export class StaffService {
    private staffRepository: StaffRepository;

    constructor() {
        this.staffRepository = new StaffRepository();
    }
    async createStaff(StaffRequest: StaffCreationAttributes) {
        return await this.staffRepository.createStaff(StaffRequest);
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