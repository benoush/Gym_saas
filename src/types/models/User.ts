// export type UserType = {
//   id: string
//   email: string
//   phone?: string
//   roles: string[]
//   relatedId?: string
//   isEmailVerified: boolean
//   isPhoneVerified: boolean
//   twoFactorEnabled: boolean
//   profilePhotoUrl: any
//   language: string
//   timezone: string
//   lastLogin?: string
//   isActive: boolean
//   isSuspended: boolean
//   createdAt: string
//   updatedAt: string
// }

export type UserType = {
    id: string;
    photo: string | null;
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    sexe: string;
    password: string;
    role: string[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}