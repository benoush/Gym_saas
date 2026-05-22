import type { UserType } from "@/types/models/User";

declare module "next-auth" {
    interface Session {
        user: UserType
        token?: string
    }
}
