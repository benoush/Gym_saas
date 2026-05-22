import * as v from "valibot";

export const LoginSchema = v.object({
    email: v.pipe(
        v.string("L'email est requis"),
        v.email("Format email invalide")
    ),
    password: v.pipe(
        v.string("Le mot de passe est requis"),
        v.minLength(6, "Minimum 6 caractères")
    ),
});

export type LoginFormData = v.InferOutput<typeof LoginSchema>;



export const RegisterSchema = v.object({
    nom: v.pipe(
        v.string("Le nom est requis"),
        v.minLength(2, "Minimum 2 caractères")
    ),
    email: v.pipe(
        v.string("L'email est requis"),
        v.email("Format email invalide")
    ),
    password: v.pipe(
        v.string("Le mot de passe est requis"),
        v.minLength(6, "Minimum 6 caractères")
    ),
    confirmPassword: v.string("Confirmation requise"),
});

export const RegisterSchemaRefined = v.pipe(
    RegisterSchema,
    v.forward(
        v.partialCheck(
            [["password"], ["confirmPassword"]],
            (data) => data.password === data.confirmPassword,
            "Les mots de passe ne correspondent pas"
        ),
        ["confirmPassword"]
    )
);

export type RegisterFormData = v.InferOutput<typeof RegisterSchema>;
