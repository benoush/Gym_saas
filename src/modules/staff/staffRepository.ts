import { Model, ModelStatic } from "sequelize";
import { Staff, StaffCreationAttributes } from "../../database/models/staff";
import { NotFoundError } from "../../common/errors/index";
import { User } from "../../database/models/user";

export class StaffRepository {
    private Staff: ModelStatic<Staff>

    constructor() {
        this.Staff = Staff;
    }

    async createStaff(data: StaffCreationAttributes) {
        return this.Staff.create(data as Staff);
    }

    async getStaffById(id: string) {
        return this.Staff.findByPk(id);
    }

    async getStaffByEmail(email: string) {
        return this.Staff.findOne({

            include: [
                {
                    model: User,
                    as: 'users',
                    where: { email },
                },
            ],
        });
    }


    async getStaffPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.Staff.findAndCountAll({ offset, limit, });
    }

    async updateStaff(id: string, data: Partial<StaffCreationAttributes>) {
        const Staff = await this.getStaffById(id);
        if (!Staff) {
            return null;
        }
        await Staff.update(data, {
            where: {
                id: data.id
            }
        });
        return Staff;
    }

    async deleteStaff(id: string) {
        const Staff = await this.getStaffById(id);
        if (!Staff)
            throw new NotFoundError("Staff");

        await Staff.destroy();
        return true;
    }
}
