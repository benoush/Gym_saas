
import { ProprietaireCreationAttributes } from "../../database/models/proprietaire";
import { ProprietaireRepository } from "./proprietaireRepository";
import { CreateProprietaireAttribute } from "./proprietaireSchema";


export class ProprietaireService {
    private proprietaireRepository: ProprietaireRepository;

    constructor() {
        this.proprietaireRepository = new ProprietaireRepository();
    }
    async createProprietaire(proprietaireRequest: ProprietaireCreationAttributes) {
        return await this.proprietaireRepository.createProprietaire(proprietaireRequest);
    }
    async getProprietaireById(id: string) {
        return await this.proprietaireRepository.getProprietaireById(id);
    }
    async getProprietaireByEmail(email: string) {
        return await this.proprietaireRepository.getProprietaireByEmail(email);
    }
    async getProprietairePaginated(page: number, limit: number) {
        return await this.proprietaireRepository.getProprietairePaginated(page, limit);
    }
    async updateProprietaire(id: string, updatedData: Partial<ProprietaireCreationAttributes>) {
        const data = await this.proprietaireRepository.getProprietaireById(id);
        if (!data) {
            return null;
        }
        return await this.proprietaireRepository.updateProprietaire(id, updatedData);
    }
    async deleteProprietaire(id: string) {
        return await this.proprietaireRepository.deleteProprietaire(id);
    }
}