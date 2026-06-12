import { Model, Optional, DataTypes, Sequelize } from "sequelize";

export interface RefreshTokenAttributes {
  id: string;
  userId: string;
  /** Hash SHA-256 du refresh token (le token brut n'est jamais stocké). */
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefreshTokenCreationAttributes
  extends Optional<
    RefreshTokenAttributes,
    "id" | "createdAt" | "updatedAt" | "revokedAt"
  > {}

class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  declare id: string;
  declare userId: string;
  declare tokenHash: string;
  declare expiresAt: Date;
  declare revokedAt: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare static associate: (models: any) => void;
}

const initModelRefreshToken = (sequelize: Sequelize) => {
  RefreshToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      tokenHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      revokedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      timestamps: true,
      underscored: true,
      paranoid: false,
    }
  );
};

RefreshToken.associate = (models: any) => {
  RefreshToken.belongsTo(models.User, { foreignKey: "userId", as: "user" });
};

export { RefreshToken, initModelRefreshToken };
