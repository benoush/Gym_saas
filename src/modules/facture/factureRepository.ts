import { Model, ModelStatic, where } from "sequelize";
import { Facture, FactureCreationAttributes } from "../../database/models/facture";
import { NotFoundError } from "../../common/errors/index";
import { TypeFacture } from "enum/typeFacture";
import { objectToInclude } from "../../common/include";

export class FactureRepository {
    private facture: ModelStatic<Facture>

    constructor() {
        this.facture = Facture;
    }

    async createFacture(data: FactureCreationAttributes) {
        return this.facture.create(data );
    }

    async getFactureById(id: string) {
        return this.facture.findByPk(id, { include: objectToInclude });
    }


    async getFacturePaginated(options: {
        where: Record<string, unknown>
        offset: number;
        limit: number;
        
      }) {
    const { offset, limit, where} = options;

        return this.facture.findAndCountAll({
      where,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
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
