import { User } from "../models/user";
import { Proprietaire } from "../models/proprietaire";
import { Client } from "../models/client";
import { RoleEnum } from "../../enum/roleEnum";
import { statutClient } from "../../enum/statutClient";
import { SeedContext } from "./context";
import { ADMIN_EMAIL, hashPassword, log, SEED_PASSWORD } from "./helpers";

/**
 * Crée les utilisateurs et leurs profils de rôle :
 *  - 1 administrateur
 *  - 2 propriétaires (+ profil Proprietaire)
 *  - 4 clients (+ profil Client)
 * Les profils Staff sont créés plus tard (dépendent des salles).
 */
export const seedUsersAndProfiles = async (ctx: SeedContext): Promise<void> => {
  const { transaction } = ctx;
  const password = await hashPassword(SEED_PASSWORD);

  // ── Admin ────────────────────────────────────────────────────────────────
  ctx.admin = await User.create(
    {
      nom: "Root",
      prenom: "Admin",
      email: ADMIN_EMAIL,
      tel: "+22890000000",
      sexe: "M",
      password,
      role: RoleEnum.ADMIN,
    },
    { transaction }
  );

  // ── Propriétaires ──────────────────────────────────────────────────────────
  const proprietairesData = [
    { nom: "Doe", prenom: "John", email: "john.doe@gymsaas.com", tel: "+22890000001", sexe: "M" },
    { nom: "Mensah", prenom: "Ama", email: "ama.mensah@gymsaas.com", tel: "+22890000002", sexe: "F" },
  ];

  for (const data of proprietairesData) {
    const user = await User.create(
      { ...data, password, role: RoleEnum.PROPRIETAIRE },
      { transaction }
    );
    const proprietaire = await Proprietaire.create(
      {
        userId: user.id,
        recto_carte_identite: "seed/cni_recto.png",
        verso_carte_identite: "seed/cni_verso.png",
        doc_justificatif: "seed/justificatif.pdf",
      },
      { transaction }
    );
    ctx.proprietaires.push(proprietaire);
  }

  // ── Clients ──────────────────────────────────────────────────────────────
  const clientsData = [
    { nom: "Kossi", prenom: "Pierre", email: "pierre.kossi@gymsaas.com", tel: "+22890000010", sexe: "M" },
    { nom: "Adjo", prenom: "Marie", email: "marie.adjo@gymsaas.com", tel: "+22890000011", sexe: "F" },
    { nom: "Sika", prenom: "Paul", email: "paul.sika@gymsaas.com", tel: "+22890000012", sexe: "M" },
    { nom: "Afi", prenom: "Sarah", email: "sarah.afi@gymsaas.com", tel: "+22890000013", sexe: "F" },
  ];

  for (const data of clientsData) {
    const user = await User.create(
      { ...data, password, role: RoleEnum.CLIENT },
      { transaction }
    );
    const client = await Client.create(
      { userId: user.id, statut: statutClient.ACTIF },
      { transaction }
    );
    ctx.clients.push(client);
  }

  log(
    `Utilisateurs créés : 1 admin, ${ctx.proprietaires.length} propriétaires, ${ctx.clients.length} clients`
  );
};
