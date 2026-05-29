import { ModelStatic } from "sequelize";
import { Paiement, PaiementCreationAttributes } from "../../database/models/paiement";
import { NotFoundError } from "../../common/errors/index";
import { PaiementIdAttribute } from "./paiementSchema";
import { statutPaiement } from "../../enum/statutPaiement";
import { methodePaiement } from "../../enum/methodePaiement";
import { Facture } from "../../database/models/facture";
import { AbonnementClient } from "../../database/models/abonnementClient";
import { AbonnementProprietaire } from "../../database/models/abonnementProprietaire";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";

export class PaiementRepository {
  private paiement: ModelStatic<Paiement>;

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
    return this.paiement.findAndCountAll({ offset, limit });
  }

  // ─── Mettre à jour le statut + activer/suspendre abonnements ─────────────
  async updateStatut(id: string, statut: statutPaiement) {
    const paiement = await this.paiement.findByPk(id);
    if (!paiement) throw new NotFoundError("paiement");

    // 1. Mettre à jour le statut du paiement
    await this.paiement.update({ statut }, { where: { id } });
    await paiement.reload();

    // 2. Récupérer la facture liée
    const facture = await Facture.findByPk(paiement.factureId);
    if (!facture) return paiement;

    // 3. ✅ PAYE → activer les deux abonnements
    if (statut === statutPaiement.PAYE) {
      await this._activerAbonnements(facture);
    }

    // 4. ✅ ECHOUE ou REMBOURSE → suspendre les deux abonnements
    if (
      statut === statutPaiement.ECHOUE ||
      statut === statutPaiement.REMBOURSE
    ) {
      await this._suspendreAbonnements(facture);
    }

    return paiement;
  }

  // ─── Activer abonnementClient + abonnementProprietaire ───────────────────
  private async _activerAbonnements(facture: Facture) {
    if (facture.abonnementClientId) {
      await AbonnementClient.update(
        { statut: StatutAbonnementEnum.ACTIF },
        { where: { id: facture.abonnementClientId } }
      );
      console.log(`✅ AbonnementClient ${facture.abonnementClientId} → ACTIF`);
    }

    if (facture.abonnementProprietaireId) {
      await AbonnementProprietaire.update(
        { statut: StatutAbonnementEnum.ACTIF },
        { where: { id: facture.abonnementProprietaireId } }
      );
      console.log(`✅ AbonnementProprietaire ${facture.abonnementProprietaireId} → ACTIF`);
    }
  }

  // ─── Suspendre si paiement échoué/remboursé ──────────────────────────────
  private async _suspendreAbonnements(facture: Facture) {
    if (facture.abonnementClientId) {
      await AbonnementClient.update(
        { statut: StatutAbonnementEnum.SUSPENDU },
        { where: { id: facture.abonnementClientId } }
      );
      console.log(`⚠️ AbonnementClient ${facture.abonnementClientId} → SUSPENDU`);
    }

    if (facture.abonnementProprietaireId) {
      await AbonnementProprietaire.update(
        { statut: StatutAbonnementEnum.SUSPENDU },
        { where: { id: facture.abonnementProprietaireId } }
      );
      console.log(`⚠️ AbonnementProprietaire ${facture.abonnementProprietaireId} → SUSPENDU`);
    }
  }

  // ─── Update méthode ───────────────────────────────────────────────────────
  async updateMethode(id: string, methode: methodePaiement) {
    const paiement = await this.paiement.findByPk(id);
    if (!paiement) throw new NotFoundError("paiement");

    // ✅ update statique + reload
    await this.paiement.update({ methode }, { where: { id } });
    await paiement.reload();
    return paiement;
  }

  // ─── Update général ───────────────────────────────────────────────────────
  async updatePaiement(id: string, data: Partial<PaiementCreationAttributes>) {
    const paiement = await this.getPaiementById(id);
    if (!paiement) throw new NotFoundError("paiement");

    // ✅ update statique sans where erroné
    await this.paiement.update(data, { where: { id } });
    await paiement.reload();
    return paiement;
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  async deletePaiement(id: string) {
    const paiement = await this.getPaiementById(id);
    if (!paiement) throw new NotFoundError("paiement");
    await paiement.destroy();
    return true;
  }
}