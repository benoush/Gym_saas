import z from "zod";
import { typePlanAbonnementClient } from "../../enum/typePlanAbonnementClient";

const createPlanAbonnementClientSchema = z.object({
  salleId: z.string().uuid("salleId must be a valid UUID"),
  type: z.nativeEnum(typePlanAbonnementClient, {
    error: `Le type doit être l'un des suivants : ${Object.values(typePlanAbonnementClient).join(", ")}`,
  }),
  prix: z.number().positive("prix must be a positive number"),
  description: z.string().max(255, "description must be at most 255 characters"),
});


const PlanAbonnementClientIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updatePlanAbonnementClientSchema = z.object({
  type: z.nativeEnum(typePlanAbonnementClient, {
    error: `Le type doit être l'un des suivants : ${Object.values(typePlanAbonnementClient).join(", ")}`,
  }),
});

const PlanAbonnementClientPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreatePlanAbonnementClientAttribute = z.infer<typeof createPlanAbonnementClientSchema>;
type PlanAbonnementClientIdAttribute = z.infer<typeof PlanAbonnementClientIdSchema>;
type PlanAbonnementClientPaginationAttribute = z.infer<typeof PlanAbonnementClientPaginationSchema>;
type UpdatePlanAbonnementClientAttribute = z.infer<typeof updatePlanAbonnementClientSchema>;

export {
  CreatePlanAbonnementClientAttribute,
  PlanAbonnementClientIdAttribute,
  PlanAbonnementClientPaginationAttribute,
  UpdatePlanAbonnementClientAttribute,
  createPlanAbonnementClientSchema,
  PlanAbonnementClientIdSchema,
  updatePlanAbonnementClientSchema,
  PlanAbonnementClientPaginationSchema,
};