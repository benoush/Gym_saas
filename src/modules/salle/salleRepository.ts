import { Model, ModelStatic } from "sequelize";
import { Salle, SalleCreationAttributes } from "../../database/models/salle";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";

export class SalleRepository {
    private salle: ModelStatic<Salle>

    constructor() {
        this.salle = Salle;
    }

    async createSalle(data: SalleCreationAttributes) {
        return this.salle.create(data as Salle);
    }

    async getSalleById(id: string) {
        return this.salle.findByPk(id);
    }


    async getSallePaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.salle.findAndCountAll({ offset, limit, });
    }

    async updateSalle(id: string, data: Partial<SalleCreationAttributes>) {
        const salle = await this.getSalleById(id);
        if (!salle) {
            return null;
        }
        await salle.update(data, {
            where: {
                id: data.id
            }
        });
        return salle;
    }

    async deleteSalle(id: string) {
        const salle = await this.getSalleById(id);
        if (!salle)
            throw new NotFoundError("salle");

        await salle.destroy();
        return true;
    }
    async getSalleByProprietaireId(proprietaireId: string) {
        return this.salle.findOne({
            where: { proprietaireId: proprietaireId },
            // include: [
            //     {
            //         model: User,
            //         as: 'users',
            //         where: { id: proprietaireId },
            //     },
            // ],
        });
    }

    async getSalleByClientId(clientId: string) {
        return this.salle.findOne({
            where: { clientId: clientId },
            // include: [
            //     {
            //         model: User,
            //         as: 'users',
            //         where: { id: clientId },
            //     },
            // ],
        });
    }
}
