
import { FactureCreationAttributes } from "../../database/models/facture";
import { FactureRepository } from "./factureRepository";


export class FactureService {
    private factureRepository: FactureRepository;

    constructor() {
        this.factureRepository = new FactureRepository();
    }
    async createFacture(FactureRequest: FactureCreationAttributes) {
        return await this.factureRepository.createFacture(FactureRequest);
    }
    async getFactureById(id: string) {
        return await this.factureRepository.getFactureById(id);
    }
    async getFacturePaginated(page: number, limit: number) {
        return await this.factureRepository.getFacturePaginated(page, limit);
    }
    async updateFacture(id: string, updatedData: Partial<FactureCreationAttributes>) {
        const data = await this.factureRepository.getFactureById(id);
        if (!data) {
            return null;
        }
        return await this.factureRepository.updateFacture(id, updatedData);
    }
    async deleteFacture(id: string) {
        return await this.factureRepository.deleteFacture(id);
    }
}