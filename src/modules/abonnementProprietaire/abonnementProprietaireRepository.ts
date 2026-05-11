import { Model, ModelStatic } from "sequelize";
import { AbonnementProprietaire, AbonnementProprietaireCreationAttributes } from "../../database/models/abonnementProprietaire";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";
import { AbonnementProprietaireIdAttribute, CreateAbonnementProprietaireAttribute } from "./abonnementProprietaireSchema";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";

export class AbonnementProprietaireRepository {
    private abonnementProprietaire: ModelStatic<AbonnementProprietaire>

    constructor() {
        this.abonnementProprietaire = AbonnementProprietaire;
    }

    async createAbonnementProprietaire(data: AbonnementProprietaireCreationAttributes) {
        return this.abonnementProprietaire.create(data as AbonnementProprietaire);
    }

    async getAbonnementProprietaireById(id: string) {
        return this.abonnementProprietaire.findByPk(id);
    }

    async getAbonnementProprietaireByEmail(email: string) {
        return this.abonnementProprietaire.findOne({

            include: [
                {
                    model: User,
                    as: 'users',
                    where: { email },
                },
            ],
        });
    }


    async getAbonnementProprietairePaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.abonnementProprietaire.findAndCountAll({ offset, limit, });
    }

    async updateStatut(id: string, statut: StatutAbonnementEnum) {
        const AbonnementProprietaire = await this.abonnementProprietaire.findByPk(id);
        if (!AbonnementProprietaire) throw new NotFoundError("AbonnementProprietaire");
            await AbonnementProprietaire.update({ statut });
        return AbonnementProprietaire;
   }

    async updateAbonnementProprietaire(id: string, data: Partial<AbonnementProprietaireIdAttribute>) {
        const AbonnementProprietaire = await this.getAbonnementProprietaireById(id);
        if (!AbonnementProprietaire) {
            return null;
        }
        await AbonnementProprietaire.update(data, {
            where: {
                id: data.id
            }
        });
        return AbonnementProprietaire;
    }

    async deleteAbonnementProprietaire(id: string) {
        const AbonnementProprietaire = await this.getAbonnementProprietaireById(id);
        if (!AbonnementProprietaire)
            throw new NotFoundError("AbonnementProprietaire");

        await AbonnementProprietaire.destroy();
        return true;
    }
}
