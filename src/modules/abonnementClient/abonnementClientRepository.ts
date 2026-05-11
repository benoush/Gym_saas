import { Model, ModelStatic } from "sequelize";
import { AbonnementClient, AbonnementClientCreationAttributes } from "../../database/models/abonnementClient";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";
import { AbonnementClientIdAttribute, CreateAbonnementClientAttribute } from "./abonnementClientSchema";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";

export class AbonnementClientRepository {
    private abonnementClient: ModelStatic<AbonnementClient>

    constructor() {
        this.abonnementClient = AbonnementClient;
    }

    async createAbonnementClient(data: AbonnementClientCreationAttributes) {
        return this.abonnementClient.create(data as AbonnementClient);
    }

    async getAbonnementClientById(id: string) {
        return this.abonnementClient.findByPk(id);
    }

    async getAbonnementClientByEmail(email: string) {
        return this.abonnementClient.findOne({

            include: [
                {
                    model: User,
                    as: 'users',
                    where: { email },
                },
            ],
        });
    }


    async getAbonnementClientPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.abonnementClient.findAndCountAll({ offset, limit, });
    }

    async updateStatut(id: string, statut: StatutAbonnementEnum) {
        const AbonnementClient = await this.abonnementClient.findByPk(id);
        if (!AbonnementClient) throw new NotFoundError("AbonnementClient");
            await AbonnementClient.update({ statut });
        return AbonnementClient;
   }

    async updateAbonnementClient(id: string, data: Partial<AbonnementClientIdAttribute>) {
        const AbonnementClient = await this.getAbonnementClientById(id);
        if (!AbonnementClient) {
            return null;
        }
        await AbonnementClient.update(data, {
            where: {
                id: data.id
            }
        });
        return AbonnementClient;
    }

    async deleteAbonnementClient(id: string) {
        const AbonnementClient = await this.getAbonnementClientById(id);
        if (!AbonnementClient)
            throw new NotFoundError("AbonnementClient");

        await AbonnementClient.destroy();
        return true;
    }
}
