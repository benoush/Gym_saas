import z from "zod";

const createStaffSchema = z.object({
  userId: z.coerce.string("userId must be a string"),
  salleId: z.coerce.string("salleId must be a string"),
});


const StaffIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const StaffPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateStaffAttribute = z.infer<typeof createStaffSchema>;
type StaffIdAttribute = z.infer<typeof StaffIdSchema>;
type StaffPaginationAttribute = z.infer<typeof StaffPaginationSchema>;

export {
  CreateStaffAttribute,
  StaffIdAttribute,
  StaffPaginationAttribute,
  createStaffSchema,
  StaffIdSchema,
  StaffPaginationSchema,
};