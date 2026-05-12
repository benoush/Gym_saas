import { Model, ModelStatic } from "sequelize";
import { Paiement, PaiementCreationAttributes } from "../../database/models/paiement";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";
import { PaiementIdAttribute } from "./paiementSchema";
import { statutPaiement } from "../../enum/statutPaiement";
import { methodePaiement } from "../../enum/methodePaiement";

export class PaiementRepository {
    private paiement: ModelStatic<Paiement>

    constructor() {
        this.paiement = Paiement;
    }

    async createPaiement(data: PaiementCreationAttributes) {
        return this.paiement.create(data as Paiement);
    }

    async getPaiementById(id: string) {
        return this.paiement.findByPk(id);
    }


    async getPaiementPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.paiement.findAndCountAll({ offset, limit, });
    }

    async updateStatut(id: string, statut: statutPaiement) {
        const Paiement = await this.paiement.findByPk(id);
        if (!Paiement) throw new NotFoundError("Paiement");
            await Paiement.update({ statut });
        return Paiement;
   }

    async updateMethode(id: string, methode: methodePaiement) {
        const Paiement = await this.paiement.findByPk(id);
        if (!Paiement) throw new NotFoundError("Paiement");
            await Paiement.update({ methode });
        return Paiement;
   }

    async updatePaiement(id: string, data: Partial<PaiementIdAttribute>) {
        const Paiement = await this.getPaiementById(id);
        if (!Paiement) {
            return null;
        }
        await Paiement.update(data, {
            where: {
                id: data.id
            }
        });
        return Paiement;
    }

    async deletePaiement(id: string) {
        const Paiement = await this.getPaiementById(id);
        if (!Paiement)
            throw new NotFoundError("Paiement");

        await Paiement.destroy();
        return true;
    }
}
