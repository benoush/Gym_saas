
import { AbonnementProprietaireCreationAttributes } from "../../database/models/abonnementProprietaire";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { AbonnementProprietaireRepository } from "./abonnementProprietaireRepository";
import { AbonnementProprietaireIdAttribute, CreateAbonnementProprietaireAttribute } from "./abonnementProprietaireSchema";


export class AbonnementProprietaireService {
    private AbonnementProprietaireRepository: AbonnementProprietaireRepository;

    constructor() {
        this.AbonnementProprietaireRepository = new AbonnementProprietaireRepository();
    }
    async createAbonnementProprietaire(AbonnementProprietaireRequest: AbonnementProprietaireCreationAttributes) {
        return await this.AbonnementProprietaireRepository.createAbonnementProprietaire(AbonnementProprietaireRequest);
    }
    async getAbonnementProprietaireById(id: string) {
        return await this.AbonnementProprietaireRepository.getAbonnementProprietaireById(id);
    }
    async getAbonnementProprietaireByEmail(email: string) {
        return await this.AbonnementProprietaireRepository.getAbonnementProprietaireByEmail(email);
    }
    async getAbonnementProprietairePaginated(page: number, limit: number) {
        return await this.AbonnementProprietaireRepository.getAbonnementProprietairePaginated(page, limit);
    }
    async updateStatut(id: string, statut: StatutAbonnementEnum.ACTIF) {
        return this.AbonnementProprietaireRepository.updateStatut(id, statut);
    }
    async updateAbonnementProprietaire(id: string, updatedData: Partial<AbonnementProprietaireIdAttribute>) {
        const data = await this.AbonnementProprietaireRepository.getAbonnementProprietaireById(id);
        if (!data) {
            return null;
        }
        return await this.AbonnementProprietaireRepository.updateAbonnementProprietaire(id, updatedData);
    }
    async deleteAbonnementProprietaire(id: string) {
        return await this.AbonnementProprietaireRepository.deleteAbonnementProprietaire(id);
    }
}