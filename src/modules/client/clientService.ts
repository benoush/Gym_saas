
import { RoleEnum } from "enum/roleEnum";
import { ClientCreationAttributes } from "../../database/models/client";
import { statutClient } from "../../enum/statutClient";
import { ClientRepository } from "./clientRepository";
import { ClientIdAttribute, CreateClientAttribute } from "./clientSchema";
import { BadRequestError } from "common/errors";
import { UserService } from "modules/user/userService";


export class ClientService {
    private clientRepository: ClientRepository;
    private userService: UserService;

    constructor() {
        this.clientRepository = new ClientRepository();
        this.userService = new UserService();
    }
    async createClient(ClientRequest: CreateClientAttribute) {

        const user = await this.userService.createuser({
            nom: ClientRequest.nom,
            prenom: ClientRequest.prenom,
            email: ClientRequest.email,
            tel: ClientRequest.tel,
            sexe: ClientRequest.sexe,
            password: ClientRequest.password,
            role: RoleEnum.CLIENT,
            photo: ClientRequest.photo,
        });

        if (!user) {
            throw new BadRequestError("Failed to create user for Client");
        }


        return await this.clientRepository.createClient({
            userId: user.id,
            statut: statutClient.ACTIF,
        });
    }
    async getClientById(id: string) {
        return await this.clientRepository.getClientById(id);
    }
    async getClientByEmail(email: string) {
        return await this.clientRepository.getClientByEmail(email);
    }
    async getClientPaginated(page: number, limit: number) {
        return await this.clientRepository.getClientPaginated(page, limit);
    }
    async updateStatut(id: string, statut: statutClient) {
        return this.clientRepository.updateStatut(id, statut);
    }
    async updateClient(id: string, updatedData: Partial<ClientIdAttribute>) {
        const data = await this.clientRepository.getClientById(id);
        if (!data) {
            return null;
        }
        return await this.clientRepository.updateClient(id, updatedData);
    }
    async deleteClient(id: string) {
        return await this.clientRepository.deleteClient(id);
    }
}