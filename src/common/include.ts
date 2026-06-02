export const objectToInclude = {
              include: [
                { association: "salle", attributes: ["id", "nom"] },
                { association: "client", attributes: ["id", "statut"] },
                { association: "proprietaire", attributes: ["id"] },
                { association: "abonnementClient" },
                { association: "abonnementProprietaire" },
                { association: "paiements" },
]
}