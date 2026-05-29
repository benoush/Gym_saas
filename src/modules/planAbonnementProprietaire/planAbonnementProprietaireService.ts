
import { typePlanAbonnementProprietaire } from "../../enum/typePlanAbonnementProprietaire";
import { PlanAbonnementProprietaireRepository } from "./planAbonnementProprietaireRepository";
import { PlanAbonnementProprietaireIdAttribute, CreatePlanAbonnementProprietaireAttribute } from "./planAbonnementProprietaireSchema";


export class PlanAbonnementProprietaireService {
    private planAbonnementProprietaireRepository: PlanAbonnementProprietaireRepository;

    constructor() {
        this.planAbonnementProprietaireRepository = new PlanAbonnementProprietaireRepository();
    }
    async createPlanAbonnementProprietaire(PlanAbonnementProprietaireRequest: CreatePlanAbonnementProprietaireAttribute) {
        return await this.planAbonnementProprietaireRepository.createPlanAbonnementProprietaire(PlanAbonnementProprietaireRequest);
    }
    async getPlanAbonnementProprietaireById(id: string) {
        return await this.planAbonnementProprietaireRepository.getPlanAbonnementProprietaireById(id);
    }
    async getPlanAbonnementProprietairePaginated(page: number, limit: number) {
        return await this.planAbonnementProprietaireRepository.getPlanAbonnementProprietairePaginated(page, limit);
    }
    async updateType(id: string, type: typePlanAbonnementProprietaire) {
        return this.planAbonnementProprietaireRepository.updateType(id, type);
    }
    async updatePlanAbonnementProprietaire(id: string, updatedData: Partial<PlanAbonnementProprietaireIdAttribute>) {
        const data = await this.planAbonnementProprietaireRepository.getPlanAbonnementProprietaireById(id);
        if (!data) {
            return null;
        }
        return await this.planAbonnementProprietaireRepository.updatePlanAbonnementProprietaire(id, updatedData);
    }
    async deletePlanAbonnementProprietaire(id: string) {
        return await this.planAbonnementProprietaireRepository.deletePlanAbonnementProprietaire(id);
    }
}