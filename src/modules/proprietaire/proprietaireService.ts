
import { BadRequestError } from "common/errors";
import { ProprietaireCreationAttributes } from "../../database/models/proprietaire";
import { ProprietaireRepository } from "./proprietaireRepository";
import { CreateProprietaireAttribute } from "./proprietaireSchema";
import { RoleEnum } from "enum/roleEnum";
import { UserService } from "modules/user/userService";


export class ProprietaireService {
    private proprietaireRepository: ProprietaireRepository;
    private userService: UserService;

    constructor() {
        this.proprietaireRepository = new ProprietaireRepository();
        this.userService = new UserService();
    }
    async createProprietaire(ProprietaireRequest: CreateProprietaireAttribute) {

        const user = await this.userService.createuser({
            nom: ProprietaireRequest.nom,
            prenom: ProprietaireRequest.prenom,
            email: ProprietaireRequest.email,
            tel: ProprietaireRequest.tel,
            sexe: ProprietaireRequest.sexe,
            password: ProprietaireRequest.password,
            role: RoleEnum.PROPRIETAIRE,
            photo: ProprietaireRequest.photo,
        });

        if (!user) {
            throw new BadRequestError("Failed to create user for proprietaire");
        }


        return await this.proprietaireRepository.createProprietaire({
            userId: user.id,
            recto_carte_identite: ProprietaireRequest.recto_carte_identite,
            verso_carte_identite: ProprietaireRequest.verso_carte_identite,
            doc_justificatif: ProprietaireRequest.doc_justificatif,
        });
    }
    async getProprietaireById(id: string) {
        return await this.proprietaireRepository.getProprietaireById(id);
    }
    async getProprietaireByEmail(email: string) {
        return await this.proprietaireRepository.getProprietaireByEmail(email);
    }
    async getProprietairePaginated(page: number, limit: number) {
        return await this.proprietaireRepository.getProprietairePaginated(page, limit);
    }
    async updateProprietaire(id: string, updatedData: Partial<ProprietaireCreationAttributes>) {
        const data = await this.proprietaireRepository.getProprietaireById(id);
        if (!data) {
            return null;
        }
        return await this.proprietaireRepository.updateProprietaire(id, updatedData);
    }
    async deleteProprietaire(id: string) {
        return await this.proprietaireRepository.deleteProprietaire(id);
    }
}