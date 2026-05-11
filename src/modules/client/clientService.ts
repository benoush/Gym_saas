
import { ClientCreationAttributes } from "../../database/models/client";
import { statutClient } from "../../enum/statutClient";
import { ClientRepository } from "./clientRepository";
import { ClientIdAttribute, CreateClientAttribute } from "./clientSchema";


export class ClientService {
    private clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
    }
    async createClient(ClientRequest: CreateClientAttribute) {
        return await this.clientRepository.createClient(ClientRequest);
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