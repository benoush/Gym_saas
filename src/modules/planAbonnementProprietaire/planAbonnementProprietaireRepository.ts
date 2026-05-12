import { Model, ModelStatic } from "sequelize";
import { PlanAbonnementProprietaire } from "../../database/models/planAbonnementProprietaire";
import { NotFoundError } from "../../common/errors/index";
import { PlanAbonnementProprietaireIdAttribute } from "./planAbonnementProprietaireSchema";
import { typePlanAbonnementProprietaire } from "../../enum/typePlanAbonnementProprietaire";
import { PlanAbonnementProprietaireCreationAttributes } from "../../database/models/planAbonnementProprietaire";

export class PlanAbonnementProprietaireRepository {
    private planAbonnementProprietaire: ModelStatic<PlanAbonnementProprietaire>

    constructor() {
        this.planAbonnementProprietaire = PlanAbonnementProprietaire;
    }

    async createPlanAbonnementProprietaire(data: PlanAbonnementProprietaireCreationAttributes) {
        return this.planAbonnementProprietaire.create(data as PlanAbonnementProprietaire);
    }

    async getPlanAbonnementProprietaireById(id: string) {
        return this.planAbonnementProprietaire.findByPk(id);
    }


    async getPlanAbonnementProprietairePaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.planAbonnementProprietaire.findAndCountAll({ offset, limit, });
    }

    async updateType(id: string, type: typePlanAbonnementProprietaire) {
        const PlanAbonnementProprietaire = await this.planAbonnementProprietaire.findByPk(id);
        if (!PlanAbonnementProprietaire) throw new NotFoundError("PlanAbonnementProprietaire");
        await PlanAbonnementProprietaire.update({ type });
        return PlanAbonnementProprietaire;
    }

    async updatePlanAbonnementProprietaire(id: string, data: Partial<PlanAbonnementProprietaireIdAttribute>) {
        const PlanAbonnementProprietaire = await this.getPlanAbonnementProprietaireById(id);
        if (!PlanAbonnementProprietaire) {
            return null;
        }
        await PlanAbonnementProprietaire.update(data, {
            where: {
                id: data.id
            }
        });
        return PlanAbonnementProprietaire;
    }

    async deletePlanAbonnementProprietaire(id: string) {
        const PlanAbonnementProprietaire = await this.getPlanAbonnementProprietaireById(id);
        if (!PlanAbonnementProprietaire)
            throw new NotFoundError("PlanAbonnementProprietaire");

        await PlanAbonnementProprietaire.destroy();
        return true;
    }
}
