import { User } from "../models/user";
import { Salle } from "../models/salle";
import { Staff } from "../models/staff";
import { RoleEnum } from "../../enum/roleEnum";
import { SeedContext } from "./context";
import { hashPassword, log, SEED_PASSWORD } from "./helpers";

/**
 * Crée les salles (rattachées aux propriétaires) puis le staff de chaque salle
 * (utilisateur rôle STAFF + profil Staff).
 *  - Propriétaire 1 : 2 salles
 *  - Propriétaire 2 : 1 salle
 *  - 1 membre de staff par salle
 */
export const seedSallesAndStaff = async (ctx: SeedContext): Promise<void> => {
  const { transaction } = ctx;
  const password = await hashPassword(SEED_PASSWORD);

  const [prop1, prop2] = ctx.proprietaires;

  const sallesData = [
    { proprietaire: prop1, nom: "FitZone Centre", contact: "+22891000001", adresse: "Bd du 13 Janvier, Lomé", horaire: "06:00-22:00" },
    { proprietaire: prop1, nom: "FitZone Plage", contact: "+22891000002", adresse: "Route de l'aéroport, Lomé", horaire: "07:00-21:00" },
    { proprietaire: prop2, nom: "PowerGym Adidogomé", contact: "+22891000003", adresse: "Adidogomé, Lomé", horaire: "05:30-23:00" },
  ];

  let staffIndex = 0;
  for (const data of sallesData) {
    const salle = await Salle.create(
      {
        proprietaireId: data.proprietaire.id,
        nom: data.nom,
        contact: data.contact,
        adresse: data.adresse,
        horaire: data.horaire,
      },
      { transaction }
    );
    ctx.salles.push(salle);

    // Un membre de staff dédié à cette salle.
    const staffUser = await User.create(
      {
        nom: "Staff",
        prenom: `Coach${staffIndex + 1}`,
        email: `coach${staffIndex + 1}@gymsaas.com`,
        tel: `+2289200000${staffIndex + 1}`,
        sexe: staffIndex % 2 === 0 ? "M" : "F",
        password,
        role: RoleEnum.STAFF,
      },
      { transaction }
    );
    const staff = await Staff.create(
      { salleId: salle.id, userId: staffUser.id },
      { transaction }
    );
    ctx.staffs.push(staff);
    staffIndex++;
  }

  log(`Salles créées : ${ctx.salles.length}, staff : ${ctx.staffs.length}`);
};
