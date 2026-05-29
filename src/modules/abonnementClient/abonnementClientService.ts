
import { PlanAbonnementClientRepository } from "modules/planAbonnementClient/planAbonnementClientRepository";
import { AbonnementClientCreationAttributes } from "../../database/models/abonnementClient";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { AbonnementClientRepository } from "./abonnementClientRepository";
import { AbonnementClientIdAttribute, CreateAbonnementClientAttribute } from "./abonnementClientSchema";
import { BadRequestError } from "common/errors";
import { Facture } from "database/models/facture";
import { typeAbonnementSalle } from "enum/typeAbonnementSalle";
import { SalleRepository } from "modules/salle/salleRepository";
import { TypeFacture } from "enum/typeFacture";


export class AbonnementClientService {
    private AbonnementClientRepository: AbonnementClientRepository;
    private PlanRepository: PlanAbonnementClientRepository; 
    private SalleRepository: SalleRepository; 
    
    constructor() {
        this.AbonnementClientRepository = new AbonnementClientRepository();
        this.PlanRepository = new PlanAbonnementClientRepository();
        this.SalleRepository = new SalleRepository();
    }
    async createAbonnementClient(abonnementClientRequest: CreateAbonnementClientAttribute) {
        let montant: number = 0;


        const planMontant = (await this.PlanRepository.getPlanAbonnementClientById(abonnementClientRequest.planId))?.prix;

        if (planMontant !== undefined) {
            switch (abonnementClientRequest.type) {
                case typeAbonnementSalle.MENSUEL:
                    montant = planMontant;
                    break;
                case typeAbonnementSalle.TRIMESTRIEL:
                    montant = planMontant * 3;
                    break;
                case typeAbonnementSalle.SEMESTRIEL:
                    montant = planMontant * 6;
                    break;
                case typeAbonnementSalle.ANNUEL:
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
            switch (abonnementClientRequest.type) {
                case typeAbonnementSalle.MENSUEL:
                    dateFin.setMonth(dateFin.getMonth() + 1);
                    break;
                case typeAbonnementSalle.TRIMESTRIEL:
                    dateFin.setMonth(dateFin.getMonth() + 3);
                    break;
                case typeAbonnementSalle.SEMESTRIEL:
                    dateFin.setMonth(dateFin.getMonth() + 6);
                    break;
                case typeAbonnementSalle.ANNUEL:
                    dateFin.setMonth(dateFin.getMonth() + 12);
                    break;
                default:
                    throw new BadRequestError("Type d'abonnement invalide");
            }

        } else {
            throw new BadRequestError("Plan non trouvé");
        }

        
const salle = await this.SalleRepository.getSalleById(abonnementClientRequest.salleId);
if (!salle) {
    throw new BadRequestError("Salle non trouvée");
}



        await Facture.create({
            typeFacture: TypeFacture.CLIENT,
            salleId: salle.id,
            montant,
            clientId: abonnementClientRequest.clientId,
            abonnementClientId: (await this.AbonnementClientRepository.getAbonnementByClientId(abonnementClientRequest.clientId))?.id || null,
            // dateFacture: new Date(),
        } );


        const amount: number = parseInt(montant.toString(), 10);
        console.log("Montant calculé pour l'abonnement propriétaire :", typeof (amount));
        return await this.AbonnementClientRepository.createAbonnementClient({
            clientId: abonnementClientRequest.clientId,
            planId: abonnementClientRequest.planId,
            type: abonnementClientRequest.type,
            statut: StatutAbonnementEnum.INNACTIF,
            nbre_sceance: 0,
            montant: amount,
            finAt: dateFin
        });

    }
    async getAbonnementClientById(id: string) {
        return await this.AbonnementClientRepository.getAbonnementClientById(id);
    }
    async getAbonnementClientByEmail(email: string) {
        return await this.AbonnementClientRepository.getAbonnementClientByEmail(email);
    }
    async getAbonnementClientPaginated(page: number, limit: number) {
        return await this.AbonnementClientRepository.getAbonnementClientPaginated(page, limit);
    }
    async updateStatut(id: string, statut: StatutAbonnementEnum) {
        return this.AbonnementClientRepository.updateStatut(id, statut);
    }
    async updateAbonnementClient(id: string, updatedData: Partial<AbonnementClientIdAttribute>) {
        const data = await this.AbonnementClientRepository.getAbonnementClientById(id);
        if (!data) {
            return null;
        }
        return await this.AbonnementClientRepository.updateAbonnementClient(id, updatedData);
    }
    async deleteAbonnementClient(id: string) {
        return await this.AbonnementClientRepository.deleteAbonnementClient(id);
    }
}