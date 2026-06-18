import { Model, ModelStatic } from "sequelize";
import { Client, ClientCreationAttributes } from "../../database/models/client";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";
import { ClientIdAttribute, CreateClientAttribute } from "./clientSchema";
import { statutClient } from "../../enum/statutClient";

export class ClientRepository {
  private client: ModelStatic<Client>;

  constructor() {
    this.client = Client;
  }

  async createClient(data: ClientCreationAttributes) {
    return this.client.create(data as Client);
  }

  async getClientById(id: string) {
    return this.client.findByPk(id);
  }

  async getClientByEmail(email: string) {
    return this.client.findOne({
      include: [
        {
          model: User,
          as: "users",
          where: { email },
        },
      ],
    });
  }

  async getClientPaginated(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return this.client.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: [
            "id",
            "photo",
            "nom",
            "prenom",
            "email",
            "tel",
            "sexe",
            "role",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
          as: "users",
        },
      ],
    });
  }

  async updateStatut(id: string, statut: statutClient) {
    const client = await this.client.findByPk(id);
    if (!client) throw new NotFoundError("client");
    await client.update({ statut });
    return client;
  }

  async updateClient(id: string, data: Partial<ClientIdAttribute>) {
    const Client = await this.getClientById(id);
    if (!Client) {
      return null;
    }
    await Client.update(data, {
      where: {
        id: data.id,
      },
    });
    return Client;
  }

  async deleteClient(id: string) {
    const Client = await this.getClientById(id);
    if (!Client) throw new NotFoundError("Client");

    await Client.destroy();
    return true;
  }
}
