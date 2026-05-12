
import { PaiementCreationAttributes } from "../../database/models/paiement";
import { methodePaiement } from "../../enum/methodePaiement";
import { statutPaiement } from "../../enum/statutPaiement";
import { PaiementRepository } from "./paiementRepository";
import { PaiementIdAttribute } from "./paiementSchema";


export class PaiementService {
    private paiementRepository: PaiementRepository;

    constructor() {
        this.paiementRepository = new PaiementRepository();
    }
    async createPaiement(PaiementRequest: PaiementCreationAttributes) {
        return await this.paiementRepository.createPaiement(PaiementRequest);
    }
    async getPaiementById(id: string) {
        return await this.paiementRepository.getPaiementById(id);
    }
    async getPaiementPaginated(page: number, limit: number) {
        return await this.paiementRepository.getPaiementPaginated(page, limit);
    }
    async updateStatut(id: string, statut: statutPaiement) {
        return this.paiementRepository.updateStatut(id, statut);
    }
    async updateMethode(id: string, methode: methodePaiement) {
        return this.paiementRepository.updateMethode(id, methode);
    }
    async updatePaiement(id: string, updatedData: Partial<PaiementIdAttribute>) {
        const data = await this.paiementRepository.getPaiementById(id);
        if (!data) {
            return null;
        }
        return await this.paiementRepository.updatePaiement(id, updatedData);
    }
    async deletePaiement(id: string) {
        return await this.paiementRepository.deletePaiement(id);
    }
}