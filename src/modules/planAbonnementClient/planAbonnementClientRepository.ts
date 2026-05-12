import { Model, ModelStatic } from "sequelize";
import { PlanAbonnementClient, PlanAbonnementClientCreationAttributes } from "../../database/models/planAbonnementClient";
import { NotFoundError } from "../../common/errors/index";
import { PlanAbonnementClientIdAttribute } from "./planAbonnementClientSchema";
import { typePlanAbonnementClient } from "../../enum/typePlanAbonnementClient";

export class PlanAbonnementClientRepository {
    private planAbonnementClient: ModelStatic<PlanAbonnementClient>

    constructor() {
        this.planAbonnementClient = PlanAbonnementClient;
    }

    async createPlanAbonnementClient(data: PlanAbonnementClientCreationAttributes) {
        return this.planAbonnementClient.create(data as PlanAbonnementClient);
    }

    async getPlanAbonnementClientById(id: string) {
        return this.planAbonnementClient.findByPk(id);
    }


    async getPlanAbonnementClientPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.planAbonnementClient.findAndCountAll({ offset, limit, });
    }

    async updateType(id: string, type: typePlanAbonnementClient) {
        const PlanAbonnementClient = await this.planAbonnementClient.findByPk(id);
        if (!PlanAbonnementClient) throw new NotFoundError("PlanAbonnementClient");
        await PlanAbonnementClient.update({ type });
        return PlanAbonnementClient;
    }

    async updatePlanAbonnementClient(id: string, data: Partial<PlanAbonnementClientIdAttribute>) {
        const PlanAbonnementClient = await this.getPlanAbonnementClientById(id);
        if (!PlanAbonnementClient) {
            return null;
        }
        await PlanAbonnementClient.update(data, {
            where: {
                id: data.id
            }
        });
        return PlanAbonnementClient;
    }

    async deletePlanAbonnementClient(id: string) {
        const PlanAbonnementClient = await this.getPlanAbonnementClientById(id);
        if (!PlanAbonnementClient)
            throw new NotFoundError("PlanAbonnementClient");

        await PlanAbonnementClient.destroy();
        return true;
    }
}
