import { ModelStatic } from "sequelize";
import { Facture, FactureCreationAttributes } from "../../database/models/facture";
import { NotFoundError } from "../../common/errors/index";
import { CreateFactureAttribute } from "./factureSchema";
import { TypeFacture } from "../../enum/typeFacture";

export class FactureService {
  private facture: ModelStatic<Facture>;

  constructor() {
    this.facture = Facture;
  }

  // ─── Créer une facture CLIENT ou PROPRIETAIRE ─────────────────────────────
  async createFacture(data: CreateFactureAttribute) {
    if (data.typeFacture === TypeFacture.CLIENT) {
  if (!data.salleId) {
    throw new Error(
      "salleId requis pour une facture CLIENT"
    );
  }
}
    // Validation métier selon typeFacture
    if (data.typeFacture === TypeFacture.CLIENT) {
      if (!data.clientId || !data.abonnementClientId) {
        throw new Error("clientId et abonnementClientId sont requis pour une facture CLIENT");
      }
      // S'assurer que les champs proprietaire sont null
      return this.facture.create({
  typeFacture: data.typeFacture,
  montant: data.montant,
  salleId: data.salleId,
  clientId: data.clientId,
  abonnementClientId: data.abonnementClientId,
  proprietaireId: null,
  abonnementProprietaireId: null,
});
    }

    if (data.typeFacture === TypeFacture.PROPRIETAIRE) {
      if (!data.proprietaireId || !data.abonnementProprietaireId) {
        throw new Error("proprietaireId et abonnementProprietaireId sont requis pour une facture PROPRIETAIRE");
      }
      // S'assurer que les champs client sont null
      return this.facture.create({
  typeFacture: data.typeFacture,
  montant: data.montant,
  salleId: null,
  proprietaireId: data.proprietaireId,
  abonnementProprietaireId: data.abonnementProprietaireId,
  clientId: null,
  abonnementClientId: null,
});
    }

    throw new Error("typeFacture invalide");
  }

  async getFactureById(id: string) {
    const facture = await this.facture.findByPk(id, {
      include: [
        { association: "salle", attributes: ["id", "nom"] },
        { association: "client", attributes: ["id", "statut"] },
        { association: "proprietaire", attributes: ["id"] },
        { association: "abonnementClient" },
        { association: "abonnementProprietaire" },
        { association: "paiements" },
      ],
    });
    if (!facture) throw new NotFoundError("facture");
    return facture;
  }

  async getFacturePaginated(options: {
    page: number;
    limit: number;
    typeFacture?: TypeFacture;
  }) {
    const { page, limit, typeFacture } = options;
    const offset = (page - 1) * limit;
    const where: Record<string, unknown> = {};
    if (typeFacture) where["typeFacture"] = typeFacture;

    return this.facture.findAndCountAll({
      where,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
  }

  async updateFacture(id: string, data: Partial<FactureCreationAttributes>) {
    const facture = await this.facture.findByPk(id);
    if (!facture) throw new NotFoundError("facture");
    await this.facture.update(data, { where: { id } });
    await facture.reload();
    return facture;
  }

  async deleteFacture(id: string) {
    const facture = await this.facture.findByPk(id);
    if (!facture) throw new NotFoundError("facture");
    await facture.destroy();
    return true;
  }
}