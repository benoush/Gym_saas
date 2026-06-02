
import { PlanAbonnementProprietaireRepository } from "modules/planAbonnementProprietaire/planAbonnementProprietaireRepository";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { AbonnementProprietaireRepository } from "./abonnementProprietaireRepository";
import { AbonnementProprietaireIdAttribute, CreateAbonnementProprietaireAttribute } from "./abonnementProprietaireSchema";
import { BadRequestError } from "common/errors";
import { typeAbonnementSaas } from "enum/typeAbonnementSaas";
import { Facture } from "database/models/facture";
import { Proprietaire } from "database/models/proprietaire";
import { SalleRepository } from "modules/salle/salleRepository";
import { TypeFacture } from "enum/typeFacture";
import { FactureRepository } from "modules/facture/factureRepository";


export class AbonnementProprietaireService {
    private AbonnementProprietaireRepository: AbonnementProprietaireRepository;
    private PlanRepository: PlanAbonnementProprietaireRepository;
    private factureRepository: FactureRepository;

    constructor() {
        this.AbonnementProprietaireRepository = new AbonnementProprietaireRepository();
        this.PlanRepository = new PlanAbonnementProprietaireRepository();
        this.factureRepository = new FactureRepository();
    }
    async createAbonnementProprietaire(AbonnementProprietaireRequest: CreateAbonnementProprietaireAttribute) {
        let montant: number = 0;


        const planMontant = (await this.PlanRepository.getPlanAbonnementProprietaireById(AbonnementProprietaireRequest.planId))?.prix;

        if (planMontant !== undefined) {
            switch (AbonnementProprietaireRequest.type) {
                case typeAbonnementSaas.MENSUEL:
                    montant = planMontant;
                    break;
                case typeAbonnementSaas.TRIMESTRIEL:
                    montant = planMontant * 3;
                    break;
                case typeAbonnementSaas.SEMESTRIEL:
                    montant = planMontant * 6;
                    break;
                case typeAbonnementSaas.ANNUEL:
                    montant = planMontant * 12;
                    break;
                default:
                    throw new BadRequestError("Type d'abonnement invalide");
            }

        } else {
            throw new BadRequestError("Plan non trouvé");
        }

        const dateDebut = new Date();
        const dateFin = new Date(dateDebut);
        if (dateFin) {
            switch (AbonnementProprietaireRequest.type) {
                case typeAbonnementSaas.MENSUEL:
                    dateFin.setMonth(dateFin.getMonth() + 1);
                    break;
                case typeAbonnementSaas.TRIMESTRIEL:
                    dateFin.setMonth(dateFin.getMonth() + 3);
                    break;
                case typeAbonnementSaas.SEMESTRIEL:
                    dateFin.setMonth(dateFin.getMonth() + 6);
                    break;
                case typeAbonnementSaas.ANNUEL:
                    dateFin.setFullYear(dateFin.getFullYear() + 1);
                    break;
                default:
                    throw new BadRequestError("Type d'abonnement invalide");
            }
        } else {
            throw new BadRequestError("Date de fin invalide");
        }

          



        await this.factureRepository.createFacture({
            typeFacture: TypeFacture.PROPRIETAIRE,
            montant,
            proprietaireId: AbonnementProprietaireRequest.proprietaireId,
            abonnementProprietaireId: (await this.AbonnementProprietaireRepository.getAbonnementByProprietaireId(AbonnementProprietaireRequest.proprietaireId))?.id || null,
            // dateFacture: new Date(),
        } );


        const amount: number = parseInt(montant.toString(), 10);
        console.log("Montant calculé pour l'abonnement propriétaire :", typeof (amount));
        return await this.AbonnementProprietaireRepository.createAbonnementProprietaire({
            proprietaireId: AbonnementProprietaireRequest.proprietaireId,
            planId: AbonnementProprietaireRequest.planId,
            type: AbonnementProprietaireRequest.type,
            statut: StatutAbonnementEnum.INNACTIF,
            montant: amount,
            finAt: dateFin
        });

    }
    async getAbonnementProprietaireById(id: string) {
        return await this.AbonnementProprietaireRepository.getAbonnementProprietaireById(id);
    }
    async getAbonnementProprietaireByEmail(email: string) {
        return await this.AbonnementProprietaireRepository.getAbonnementProprietaireByEmail(email);
    }
    async getAbonnementProprietairePaginated(page: number, limit: number) {
        return await this.AbonnementProprietaireRepository.getAbonnementProprietairePaginated(page, limit);
    }
    async updateStatut(id: string, statut: StatutAbonnementEnum.ACTIF) {
        return this.AbonnementProprietaireRepository.updateStatut(id, statut);
    }
    async updateAbonnementProprietaire(id: string, updatedData: Partial<AbonnementProprietaireIdAttribute>) {
        const data = await this.AbonnementProprietaireRepository.getAbonnementProprietaireById(id);
        if (!data) {
            return null;
        }
        return await this.AbonnementProprietaireRepository.updateAbonnementProprietaire(id, updatedData);
    }
    async deleteAbonnementProprietaire(id: string) {
        return await this.AbonnementProprietaireRepository.deleteAbonnementProprietaire(id);
    }
    // ─── Activer l'abonnement (appelé après paiement PAYE) ────────────────────
    async activerAbonnement(id: string) {
        const abonnement = await this.getAbonnementProprietaireById(id);

        if (abonnement.statut === StatutAbonnementEnum.ACTIF) {
            return abonnement; // Déjà actif, rien à faire
        }

        return this.AbonnementProprietaireRepository.updateStatut(id, StatutAbonnementEnum.ACTIF);
    }

    // ─── Expirer les abonnements dépassés (appelé par le cron job) ────────────
    async expirerAbonnementsDepasses(): Promise<number> {
        return this.AbonnementProprietaireRepository.expirerAbonnementsDepasses();
    }
}