import { Model, ModelStatic } from "sequelize";
import { Facture, FactureCreationAttributes } from "../../database/models/facture";
import { NotFoundError } from "../../common/errors/index";

export class FactureRepository {
    private facture: ModelStatic<Facture>

    constructor() {
        this.facture = Facture;
    }

    async createFacture(data: FactureCreationAttributes) {
        return this.facture.create(data as Facture);
    }

    async getFactureById(id: string) {
        return this.facture.findByPk(id);
    }


    async getFacturePaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.facture.findAndCountAll({ offset, limit, });
    }

    async updateFacture(id: string, data: Partial<FactureCreationAttributes>) {
        const Facture = await this.getFactureById(id);
        if (!Facture) {
            return null;
        }
        await Facture.update(data, {
            where: {
                id: data.id
            }
        });
        return Facture;
    }

    async deleteFacture(id: string) {
        const Facture = await this.getFactureById(id);
        if (!Facture)
            throw new NotFoundError("Facture");

        await Facture.destroy();
        return true;
    }
}
