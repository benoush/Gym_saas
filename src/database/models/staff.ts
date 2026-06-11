import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface StaffAttributes {
    id: string;
    salleId: string;
    userId: string;
    createdAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
}

export interface StaffCreationAttributes extends Optional<StaffAttributes, "id" | "createdAt" | "updateAt" | "deleteAt"> { }

class Staff extends Model<StaffAttributes, StaffCreationAttributes> implements StaffAttributes {
    declare id: string;
    declare salleId: string;
    declare userId: string;
    declare readonly createdAt?: Date;
    declare readonly updateAt?: Date;
    declare readonly deleteAt?: Date;

    declare static associate: (models: any) => void;
}

const initModelStaff = (sequelize: Sequelize) => {
    Staff.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            salleId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'salles',
                    key: 'id',
                }
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
        },
        {
            sequelize,
            modelName: "Staff",
            tableName: 'staffs',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}

Staff.associate = (models: any) => {
    Staff.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Staff.belongsTo(models.Salle, { foreignKey: 'salleId', as: 'salles' });
};

export { Staff, initModelStaff };


