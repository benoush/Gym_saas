import { Model, ModelStatic } from "sequelize";
import { Proprietaire, ProprietaireCreationAttributes } from "../../database/models/proprietaire";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";

export class ProprietaireRepository {
    private proprietaire: ModelStatic<Proprietaire>

    constructor() {
        this.proprietaire = Proprietaire;
    }

    async createProprietaire(data: ProprietaireCreationAttributes) {
        return this.proprietaire.create(data as Proprietaire);
    }

    async getProprietaireById(id: string) {
        return this.proprietaire.findByPk(id);
    }

    async getProprietaireByEmail(email: string) {
        return this.proprietaire.findOne({

            include: [
                {
                    model: User,
                    as: 'users',
                    where: { email },
                },
            ],
        });
    }


    async getProprietairePaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.proprietaire.findAndCountAll({ offset, limit, });
    }

    async updateProprietaire(id: string, data: Partial<ProprietaireCreationAttributes>) {
        const Proprietaire = await this.getProprietaireById(id);
        if (!Proprietaire) {
            return null;
        }
        await Proprietaire.update(data, {
            where: {
                id: data.id
            }
        });
        return Proprietaire;
    }

    async deleteProprietaire(id: string) {
        const Proprietaire = await this.getProprietaireById(id);
        if (!Proprietaire)
            throw new NotFoundError("Proprietaire");

        await Proprietaire.destroy();
        return true;
    }
}
