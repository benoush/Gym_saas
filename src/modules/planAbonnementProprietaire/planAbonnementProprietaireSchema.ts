import z from "zod";
import { typePlanAbonnementProprietaire } from "enum/typePlanAbonnementProprietaire";

const createPlanAbonnementProprietaireSchema = z.object({
  type: z.nativeEnum(typePlanAbonnementProprietaire, {
    error: `Le type doit être l'un des suivants : ${Object.values(typePlanAbonnementProprietaire).join(", ")}`,
  }),
  prix: z.number().positive("prix must be a positive number"),

});


const PlanAbonnementProprietaireIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updatePlanAbonnementProprietaireSchema = z.object({
  type: z.nativeEnum(typePlanAbonnementProprietaire, {
    error: `Le type doit être l'un des suivants : ${Object.values(typePlanAbonnementProprietaire).join(", ")}`,
  }),

});

const PlanAbonnementProprietairePaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreatePlanAbonnementProprietaireAttribute = z.infer<typeof createPlanAbonnementProprietaireSchema>;
type PlanAbonnementProprietaireIdAttribute = z.infer<typeof PlanAbonnementProprietaireIdSchema>;
type PlanAbonnementProprietairePaginationAttribute = z.infer<typeof PlanAbonnementProprietairePaginationSchema>;
type UpdatePlanAbonnementProprietaireAttribute = z.infer<typeof updatePlanAbonnementProprietaireSchema>;

export {
  CreatePlanAbonnementProprietaireAttribute,
  PlanAbonnementProprietaireIdAttribute,
  PlanAbonnementProprietairePaginationAttribute,
  UpdatePlanAbonnementProprietaireAttribute,
  createPlanAbonnementProprietaireSchema,
  PlanAbonnementProprietaireIdSchema,
  updatePlanAbonnementProprietaireSchema,
  PlanAbonnementProprietairePaginationSchema,
};