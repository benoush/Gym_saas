
import { UserCreationAttributes } from "../../database/models/user";
import { UserRepository } from "./userRepository";
import { CreateUserAttribute } from "./userSchema";
import bcrypt from "bcryptjs";



export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    async createuser(userRequest: UserCreationAttributes) {
  const hashedPassword = await bcrypt.hash(userRequest.password, 10);
  return this.userRepository.createuser({
    ...userRequest,
    password: hashedPassword,
  });
}
    async getuserById(id: string) {
        return await this.userRepository.getuserById(id);
    }
    async getuserByEmail(email: string) {
        return await this.userRepository.getuserByEmail(email);
    }
    async getuserPaginated(page: number, limit: number) {
        return await this.userRepository.getuserPaginated(page, limit);
    }
    async updateuser(id: string, updatedData: Partial<UserCreationAttributes>) {
        const data = await this.userRepository.getuserById(id);
        if (!data) {
            return null;
        }
        return await this.userRepository.updateuser(id, updatedData);
    }
    async deleteuser(id: string) {
        return await this.userRepository.deleteuser(id);
    }
}