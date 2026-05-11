import { Model, ModelStatic } from "sequelize";
import { User, UserCreationAttributes } from "../../database/models/user";
import { NotFoundError } from "../../common/errors/index";

export class UserRepository {
    private user: ModelStatic<User>

    constructor() {
        this.user = User;
    }

    async createuser(data: UserCreationAttributes) {
        return this.user.create(data as User);
    }

    async getuserById(id: string) {
        return this.user.findByPk(id);
    }

    async getuserByEmail(email: string) {
        return this.user.findOne({

            where: {
                email
            }
        });
    }


    async getuserPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.user.findAndCountAll({ offset, limit, });
    }

    async updateuser(id: string, data: Partial<UserCreationAttributes>) {
        const user = await this.getuserById(id);
        if (!user) {
            return null;
        }
        await user.update(data, {
            where: {
                id: data.id
            }
        });
        return user;
    }

    async deleteuser(id: string) {
        const user = await this.getuserById(id);
        if (!user)
            throw new NotFoundError("user");

        await user.destroy();
        return true;
    }
}
