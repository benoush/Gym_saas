import z from "zod";
import { statutClient } from "../../enum/statutClient";

const createClientSchema = z.object({
  userId: z.coerce.string("userId must be a string"),
});


const ClientIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updateClientSchema = z.object({
  statut: z.nativeEnum(statutClient, {
    error: `Le statut doit être l'un des suivants : ${Object.values(statutClient).join(", ")}`,
  }),
});

const ClientPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateClientAttribute = z.infer<typeof createClientSchema>;
type ClientIdAttribute = z.infer<typeof ClientIdSchema>;
type ClientPaginationAttribute = z.infer<typeof ClientPaginationSchema>;
type UpdateClientAttribute = z.infer<typeof updateClientSchema>;

export {
  CreateClientAttribute,
  ClientIdAttribute,
  ClientPaginationAttribute,
  UpdateClientAttribute,
  createClientSchema,
  ClientIdSchema,
  updateClientSchema,
  ClientPaginationSchema,
};