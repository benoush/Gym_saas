
import { SalleCreationAttributes } from "../../database/models/salle";
import { SalleRepository } from "./salleRepository";
import { UpdatesalleAttribute } from "./salleSchema";


export class SalleService {
    private salleRepository: SalleRepository;

    constructor() {
        this.salleRepository = new SalleRepository();
    }
    async createSalle(salleRequest: SalleCreationAttributes) {
        return await this.salleRepository.createSalle(salleRequest);
    }
    async getSalleById(id: string) {
        return await this.salleRepository.getSalleById(id);
    }
    async getSallePaginated(page: number, limit: number) {
        return await this.salleRepository.getSallePaginated(page, limit);
    }
    async updateSalle(id: string, updatedData: Partial<SalleCreationAttributes>) {
        const data = await this.salleRepository.getSalleById(id);
        if (!data) {
            return null;
        }
        return await this.salleRepository.updateSalle(id, updatedData);
    }
    async deleteSalle(id: string) {
        return await this.salleRepository.deleteSalle(id);
    }
}