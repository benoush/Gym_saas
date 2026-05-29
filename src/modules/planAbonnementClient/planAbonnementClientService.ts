
import { PlanAbonnementClientCreationAttributes } from "../../database/models/planAbonnementClient";
import { typePlanAbonnementClient } from "../../enum/typePlanAbonnementClient";
import { PlanAbonnementClientRepository } from "./planAbonnementClientRepository";
import { CreatePlanAbonnementClientAttribute, PlanAbonnementClientIdAttribute } from "./planAbonnementClientSchema";


export class PlanAbonnementClientService {
    private planAbonnementClientRepository: PlanAbonnementClientRepository;

    constructor() {
        this.planAbonnementClientRepository = new PlanAbonnementClientRepository();
    }
    async createPlanAbonnementClient(PlanAbonnementClientRequest: CreatePlanAbonnementClientAttribute) {
        return await this.planAbonnementClientRepository.createPlanAbonnementClient(PlanAbonnementClientRequest);
    }
    async getPlanAbonnementClientById(id: string) {
        return await this.planAbonnementClientRepository.getPlanAbonnementClientById(id);
    }
    async getPlanAbonnementClientPaginated(page: number, limit: number) {
        return await this.planAbonnementClientRepository.getPlanAbonnementClientPaginated(page, limit);
    }
    async updateType(id: string, type: typePlanAbonnementClient) {
        return this.planAbonnementClientRepository.updateType(id, type);
    }
    async updatePlanAbonnementClient(id: string, updatedData: Partial<PlanAbonnementClientIdAttribute>) {
        const data = await this.planAbonnementClientRepository.getPlanAbonnementClientById(id);
        if (!data) {
            return null;
        }
        return await this.planAbonnementClientRepository.updatePlanAbonnementClient(id, updatedData);
    }
    async deletePlanAbonnementClient(id: string) {
        return await this.planAbonnementClientRepository.deletePlanAbonnementClient(id);
    }
}