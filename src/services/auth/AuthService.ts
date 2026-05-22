import type { LoginFormData } from "@/validations/auth.validation"
import instance from "../manager/axiosInstance"

export class AuthService {
    static login = async (data: LoginFormData) => {
        return await instance.post('/auth/login', data)
    }
}
