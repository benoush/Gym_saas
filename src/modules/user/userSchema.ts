import z from "zod"

const createUserSchema = z.object({
  nom: z.string().max(255),
  prenom: z.string().max(255),
  email: z.string().email(),
  tel: z.string().max(20),
  sexe: z.string().max(255),
  password: z.string().max(255),
  role: z.string().max(255),
  photo: z.string().optional(),
});

const idUserSchema = z.object({
    id: z.string().uuid("id must be a uuid"),

});

const emailUserSchema = z.object({
    email: z.string().email("email must be a valid email address"),
});

const userPaginationSchema = z.object({
    page: z.coerce.number("page must be a number"),
    limit: z.coerce.number("limit must be a number")
});

type CreateUserAttribute = z.infer<typeof createUserSchema>;
type IdUserAttribute = z.infer<typeof idUserSchema>;
type EmailUserAttribute = z.infer<typeof emailUserSchema>;
type UserPaginationAttribute = z.infer<typeof userPaginationSchema>;

export {
    CreateUserAttribute,
    IdUserAttribute,
    EmailUserAttribute,
    UserPaginationAttribute,
    createUserSchema,
    idUserSchema,
    emailUserSchema,
    userPaginationSchema
}