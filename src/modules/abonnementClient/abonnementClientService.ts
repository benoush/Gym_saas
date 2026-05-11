
import { AbonnementClientCreationAttributes } from "../../database/models/abonnementClient";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { AbonnementClientRepository } from "./abonnementClientRepository";
import { AbonnementClientIdAttribute, CreateAbonnementClientAttribute } from "./abonnementClientSchema";


export class AbonnementClientService {
    private AbonnementClientRepository: AbonnementClientRepository;

    constructor() {
        this.AbonnementClientRepository = new AbonnementClientRepository();
    }
    async createAbonnementClient(AbonnementClientRequest: AbonnementClientCreationAttributes) {
        return await this.AbonnementClientRepository.createAbonnementClient(AbonnementClientRequest);
    }
    async getAbonnementClientById(id: string) {
        return await this.AbonnementClientRepository.getAbonnementClientById(id);
    }
    async getAbonnementClientByEmail(email: string) {
        return await this.AbonnementClientRepository.getAbonnementClientByEmail(email);
    }
    async getAbonnementClientPaginated(page: number, limit: number) {
        return await this.AbonnementClientRepository.getAbonnementClientPaginated(page, limit);
    }
    async updateStatut(id: string, statut: StatutAbonnementEnum) {
        return this.AbonnementClientRepository.updateStatut(id, statut);
    }
    async updateAbonnementClient(id: string, updatedData: Partial<AbonnementClientIdAttribute>) {
        const data = await this.AbonnementClientRepository.getAbonnementClientById(id);
        if (!data) {
            return null;
        }
        return await this.AbonnementClientRepository.updateAbonnementClient(id, updatedData);
    }
    async deleteAbonnementClient(id: string) {
        return await this.AbonnementClientRepository.deleteAbonnementClient(id);
    }
}